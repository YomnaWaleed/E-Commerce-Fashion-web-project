import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "../controllers/product_controller.mjs";

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
router.get("/", getAllProducts);

// @route   GET /api/products/:id
// @desc    Get product by ID
router.get("/:id", getProductById);

// @route   GET /api/products/category/:category
// @desc    Get products by category (e.g., men's shoes)
router.get("/category/:category", getProductsByCategory);

export default router;
