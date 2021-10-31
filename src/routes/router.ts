import express from 'express';
import authMiddleware from '../middleware/auth';
import { addToken, addUserToken, getTokens, getUserTokens, deleteToken } from '../controllers/TokenController';
import { adminLogin, createAdmin } from '../controllers/UserController';
import { addGame, deleteGame, getGames } from '../controllers/GameController';

const router = express.Router();

// AUTH
router.post('/user/register', createAdmin);
router.post('/user/login', adminLogin);

router.get('/tokens', getTokens);
router.post('/token', addToken);
router.delete('/token/:id', deleteToken);

router.get('/games', getGames);
router.post('/game', addGame);
router.delete('/game/:id', deleteGame);

router.post('/user/token', authMiddleware, addUserToken);
router.get('/user/tokens', authMiddleware, getUserTokens);

export default router;