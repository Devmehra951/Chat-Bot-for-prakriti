import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import { validateAuth } from '../middleware/validate.js';
const router=Router();
router.post('/register',validateAuth,register);
router.post('/login',validateAuth,login);
export default router;
