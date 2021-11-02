import express from 'express';
import authMiddleware from '../middleware/auth';
import { addToken, addUserToken, getTokens, getUserTokens, deleteToken, editToken } from '../controllers/TokenController';
import { adminLogin, adminProfile, createAdmin } from '../controllers/UserController';
import { addGame, deleteGame, getGames } from '../controllers/GameController';
import { addUserInvestment, getUserInvestments } from '../controllers/InvestmentController';

const router = express.Router();

// AUTH
router.post('/user/register', createAdmin);
router.post('/user/login', adminLogin);
router.get('/user/me', authMiddleware, adminProfile);

router.get('/tokens', getTokens);
router.post('/token', addToken);
router.delete('/token/:id', deleteToken);
router.put('/token/:id', editToken);

router.get('/games', getGames);
router.post('/game', addGame);
router.delete('/game/:id', deleteGame);

router.post('/user/token', authMiddleware, addUserToken);
router.get('/user/tokens', authMiddleware, getUserTokens);

router.post('/user/investment', authMiddleware, addUserInvestment);
router.get('/user/investments', authMiddleware, getUserInvestments);

export default router;