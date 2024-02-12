import { Router } from 'express';
import CartController from '../../controllers/cart.controller.js';

const router = Router();

router.get('/cart', CartController.getAllCarts);

router.get('/cart/:sid', CartController.getCart);
router.put('/cart/:sid', CartController.updateCart);
router.delete('/cart/:sid', CartController.deleteCart);

export default router;