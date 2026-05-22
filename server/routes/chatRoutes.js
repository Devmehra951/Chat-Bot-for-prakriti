import { Router } from 'express';
import { chat, getChats } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateChat } from '../middleware/validate.js';
const router=Router();
router.post('/',protect,validateChat,chat);
router.get('/',protect,getChats);
export default router;
