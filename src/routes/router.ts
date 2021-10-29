import express from 'express';
import { addToken } from '../controllers/TokenController';
import { sendHello } from '../controllers/HelloController';

const router = express.Router();

router.get('/hello', sendHello);
router.post('/token', addToken);

export default router;