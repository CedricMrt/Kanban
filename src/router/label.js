import { Router } from 'express';
import labelController from '../controllers/labelController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(labelController.getAll));
router.get('/:id', cw(labelController.getOne));
router.post('/', cw(labelController.create));
router.patch('/:id', cw(labelController.update));
router.delete('/:id', cw(labelController.delete));

export default router;
