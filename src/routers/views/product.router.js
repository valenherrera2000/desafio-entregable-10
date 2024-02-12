import { Router } from 'express';
import ProductController from '../../controllers/product.controller.js';

const router = Router();

router.get('/products', ProductController.getAllProducts);
router.get('/:pid', ProductController.getProduct);
router.put('/:pid', ProductController.updateProduct);
router.delete('/:pid', ProductController.deleteProduct);

export default router;
