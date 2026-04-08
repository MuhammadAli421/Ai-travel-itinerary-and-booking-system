import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import { requireFields } from '../middleware/validate.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', requireFields(['name', 'email', 'password']), register);
router.post('/login',    requireFields(['email', 'password']), login);
router.post('/logout',   requireAuth, logout);
router.get('/me',        requireAuth, getMe);

export default router;
