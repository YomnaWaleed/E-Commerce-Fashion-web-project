import express from 'express';
import { addToCart, getCart } from '../controllers/cart_controller.mjs';

const router = express.Router();

router.post('/', addToCart);
router.get('/:userId', getCart);

export default router;