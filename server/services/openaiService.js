import OpenAI from 'openai';

const systemPrompt =
  'You are a professional environmental awareness assistant. Provide accurate, evidence-based, safe guidance about climate, pollution, biodiversity, conservation, and sustainability. Refuse harmful or unsafe instructions and avoid fake scientific claims.';

let openaiClient = null;

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
    throw new Error(
      'OPENAI_API_KEY is missing. Add it to server/.env, restart the server, and try again.'
    );
  }

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    temperature: 0.6
  });

  return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
};
