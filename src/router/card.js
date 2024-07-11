import { Router } from 'express';
import cardController from '../controllers/cardController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(cardController.getAll));
router.get('/:id', cw(cardController.getOne));
router.post('/', cw(cardController.create));
router.patch('/:id', cw(cardController.update));
router.delete('/:id', cw(cardController.delete));

router.put('/:card_id/labels/:label_id', cw(cardController.addLabel));
router.delete('/:card_id/labels/:label_id', cw(cardController.removeLabel));

export default router;
