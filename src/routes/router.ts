import express from 'express';
import authMiddleware from '../middleware/auth';
import { addToken, addUserToken, getTokens, getUserTokens } from '../controllers/TokenController';
import { adminLogin, createAdmin } from '../controllers/UserController';

const router = express.Router();

// AUTH
router.post('/user/register', createAdmin);
router.post('/user/login', adminLogin);

router.get('/tokens', getTokens);
router.post('/token', addToken);
router.post('/user/token', authMiddleware, addUserToken);
router.get('/user/tokens', authMiddleware, getUserTokens);

export default router;