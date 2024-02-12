import { Router } from 'express';
import UserController from '../../controllers/user.controller.js';

const router = Router();

router.get('/users', UserController.getAllUsers);

router.get('/users/:uid', UserController.getUser);
router.put('/users/:uid', UserController.updateUser);
router.delete('/users/:uid', UserController.deleteUser);

export default router;
