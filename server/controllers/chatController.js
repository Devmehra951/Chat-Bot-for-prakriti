import Chat from '../models/Chat.js';
import { generateReply } from '../services/openaiService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const chat = asyncHandler(async (req, res) => {
  const { message, chatId } = req.body;
  const reply = await generateReply(message);
  let chatDoc;
  if (chatId) chatDoc = await Chat.findOne({ _id: chatId, user: req.user._id });
  if (!chatDoc) chatDoc = await Chat.create({ user: req.user._id, title: message.slice(0, 40), messages: [] });
  chatDoc.messages.push({ role: 'user', content: message });
  chatDoc.messages.push({ role: 'assistant', content: reply });
  await chatDoc.save();
  res.json({ reply, chatId: chatDoc._id });
});

export const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.json(chats);
});
