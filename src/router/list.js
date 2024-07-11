import { Router } from 'express';
import listController from './../controllers/listController.js';
import cw from './../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(listController.getAll));
router.get('/:id', cw(listController.getOne));
router.post('/', cw(listController.create));
router.patch('/:id', cw(listController.update));
router.delete('/:id', cw(listController.delete));

export default router;
