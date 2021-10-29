import express from 'express';
import { addToken, getTokens } from '../controllers/TokenController';

const router = express.Router();

router.get('/tokens', getTokens);
router.post('/token', addToken);

export default router;