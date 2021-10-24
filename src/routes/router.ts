import express from 'express';
import { sendHello } from '../controllers/HelloController';

const router = express.Router();

router.get('/hello', sendHello);

export default router;