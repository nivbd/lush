import { Router } from 'express';
import * as userController from '../controllers/user.js';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getById);
router.post('/', userController.create);

export { router as userRoutes };
