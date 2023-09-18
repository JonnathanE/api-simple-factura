import express from 'express';
import authReoutes from '@routes/auth.routes';

const router = express.Router();

router.use('/auth', authReoutes);

export default router;
