import OpenAI from 'openai';

const systemPrompt =
  'You are a professional environmental awareness assistant. Provide accurate, evidence-based, safe guidance about climate, pollution, biodiversity, conservation, and sustainability. Refuse harmful or unsafe instructions and avoid fake scientific claims.';

let openaiClient = null;

const buildServiceError = (status, message) => {
  const error = new Error(message);
  error.statusCode = status;
  return error;
};

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || !apiKey.trim()) {
    return null;
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }

  return openaiClient;
};

export const generateReply = async (message) => {
  const client = getOpenAIClient();

  if (!client) {
    throw buildServiceError(
      500,
      'OPENAI_API_KEY is missing. Add it to server/.env, restart the server, and try again.'
    );
  }

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.6
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    const status = error?.status || error?.statusCode || 500;

    if (status === 429) {
      throw buildServiceError(
        429,
        'OpenAI quota exceeded. Please check billing/quota and try again later.'
      );
    }

    if (status === 401) {
      throw buildServiceError(
        401,
        'OpenAI API key is invalid. Update OPENAI_API_KEY in server/.env and restart the server.'
      );
    }

    throw buildServiceError(status, error?.message || 'OpenAI request failed. Please try again later.');
  }
};
