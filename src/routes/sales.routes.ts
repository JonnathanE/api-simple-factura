/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { getAll, create } from '@controllers/sale.controller';
import { validateJWT } from '@middlewares/auth';

const router = express.Router();

router.use(validateJWT());

router.get('/', getAll);
router.post('/', create);

export default router;
