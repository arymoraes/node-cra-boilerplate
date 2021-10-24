import express from 'express';

const router = express.Router();

router.get('/hello', () => console.log('Hello World'));

export default router;