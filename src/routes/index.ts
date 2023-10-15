import express from 'express';
import authReoutes from '@routes/auth.routes';
import salesReoutes from '@routes/sales.routes';

const router = express.Router();

router.use('/auth', authReoutes);
router.use('/sales', salesReoutes);

export default router;
