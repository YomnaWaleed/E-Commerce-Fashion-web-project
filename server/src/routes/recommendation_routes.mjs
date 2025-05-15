import express from "express";
import { getRecommendations } from "../controllers/recommendation_controller.mjs";

const router = express.Router();

// Get recommended products
router.get("/", getRecommendations);

export default router;
