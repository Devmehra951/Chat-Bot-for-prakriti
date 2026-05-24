import OpenAI from 'openai';

const systemPrompt =
  'You are a professional environmental awareness assistant. Provide accurate, evidence-based, safe guidance about climate, pollution, biodiversity, conservation, and sustainability. Refuse harmful or unsafe instructions and avoid fake scientific claims.';

const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const OPENAI_TIMEOUT_MS = Number(process.env.OPENAI_TIMEOUT_MS || 30000);
const OPENAI_MAX_RETRIES = Number(process.env.OPENAI_MAX_RETRIES || 3);

let openaiClient = null;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const buildServiceError = (statusCode, message, code = 'OPENAI_ERROR') => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
};

const validateOpenAIEnv = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || !apiKey.trim()) {
    throw buildServiceError(
      500,
      'OPENAI_API_KEY is missing. Add it to server/.env and restart the server.',
      'OPENAI_KEY_MISSING'
    );
  }

  return apiKey;
};

const getOpenAIClient = () => {
  const apiKey = validateOpenAIEnv();

  if (!openaiClient) {
    const options = {
      apiKey,
      timeout: OPENAI_TIMEOUT_MS,
      maxRetries: 0
    };

    if (process.env.OPENAI_ORG_ID?.trim()) {
      options.organization = process.env.OPENAI_ORG_ID.trim();
    }

    openaiClient = new OpenAI(options);
  }

  return openaiClient;
};

const mapOpenAIError = (error) => {
  const status = error?.status || error?.statusCode || 500;

  if (status === 429) {
    return buildServiceError(
      429,
      'OpenAI quota exceeded. Please check billing/quota and try again later.',
      'OPENAI_QUOTA_EXCEEDED'
    );
  }

  if (status === 401) {
    return buildServiceError(
      401,
      'OpenAI API key is invalid. Update OPENAI_API_KEY in server/.env and restart server.',
      'OPENAI_KEY_INVALID'
    );
  }

  if (status === 408 || status === 504) {
    return buildServiceError(504, 'OpenAI timeout. Please try again.', 'OPENAI_TIMEOUT');
  }

  return buildServiceError(status, error?.message || 'OpenAI request failed.', 'OPENAI_REQUEST_FAILED');
};

const shouldRetry = (error) => {
  const status = error?.status || error?.statusCode;
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
};

export const generateReply = async (message) => {
  const client = getOpenAIClient();

  for (let attempt = 0; attempt <= OPENAI_MAX_RETRIES; attempt += 1) {
    try {
      const completion = await client.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.6
      });

      return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      const lastAttempt = attempt === OPENAI_MAX_RETRIES;

      if (!lastAttempt && shouldRetry(error)) {
        const delay = Math.min(1000 * 2 ** attempt, 8000);
        console.warn('[openai.retry]', {
          attempt: attempt + 1,
          delay,
          status: error?.status,
          message: error?.message
        });
        await sleep(delay);
        continue;
      }

      throw mapOpenAIError(error);
    }
  }

  throw buildServiceError(500, 'Unexpected OpenAI processing failure.', 'OPENAI_UNEXPECTED');
};
