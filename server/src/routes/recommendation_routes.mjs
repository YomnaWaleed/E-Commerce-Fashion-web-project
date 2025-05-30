import express from 'express';
import { getRecommendations } from '../controllers/recommendation_controller.mjs';

const router = express.Router();

router.get('/:category/:currentProductId', getRecommendations);

export default router;