import express from "express";
import {
  addToCart,
  removeFromCart,
  getCartByUserId as getCart,
} from "../controllers/cart_controller.mjs";

const router = express.Router();

// Add an item to cart
router.post("/add", addToCart);

// Remove an item from cart
router.post("/remove", removeFromCart);

// Get cart items for a user (you might pass userId as query or param)
router.get("/:userId", getCart);

export default router;
