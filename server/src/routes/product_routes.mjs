import express from "express";
import { getAllProducts } from "../controllers/product_controller.mjs";

const router = express.Router();

router.get("/", getAllProducts); // Make sure this route exists

export default router;
