import express from 'express';
import authMiddleware from '../middleware/auth';
import { addToken, addUserToken, getTokens, getUserTokens } from '../controllers/TokenController';
import { adminLogin, createAdmin } from '../controllers/UserController';
import { addGame, getGames } from '../controllers/GameController';

const router = express.Router();

// AUTH
router.post('/user/register', createAdmin);
router.post('/user/login', adminLogin);

router.get('/tokens', getTokens);
router.post('/token', addToken);

router.get('/games', getGames);
router.post('/game', addGame);

router.post('/user/token', authMiddleware, addUserToken);
router.get('/user/tokens', authMiddleware, getUserTokens);

export default router;