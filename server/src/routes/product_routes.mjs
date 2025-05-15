import express from 'express';
import { getProducts, getProductsByCategory, getProductById } from '../controllers/product_controller.mjs';

const router = express.Router();

router.get('/', getProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

export default router;