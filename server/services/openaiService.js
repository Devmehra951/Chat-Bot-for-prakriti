import OpenAI from 'openai';
const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
const systemPrompt=`You are a professional environmental awareness assistant. Provide accurate, evidence-based, safe guidance about climate, pollution, biodiversity, conservation, and sustainability. Refuse harmful or unsafe instructions and avoid fake scientific claims.`;
export const generateReply=async(message)=>{const completion=await client.chat.completions.create({model:process.env.OPENAI_MODEL||'gpt-4o-mini',messages:[{role:'system',content:systemPrompt},{role:'user',content:message}],temperature:0.6});return completion.choices[0].message.content;};
