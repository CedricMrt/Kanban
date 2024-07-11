import { Router } from 'express';
import listRouter from './list.js';
import labelRouter from './label.js';
import cardRouter from './card.js';

const router = Router();

router.use('/api/v1/lists', listRouter);
router.use('/api/v1/labels', labelRouter);
router.use('/api/v1/cards', cardRouter);

export default router;
