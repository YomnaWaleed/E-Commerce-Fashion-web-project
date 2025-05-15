import Cart from "../models/cart_model.mjs";

// @desc    Get cart by user ID
// @route   GET /api/cart/:userId
export const getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc    Add or update item in cart
// @route   POST /api/cart/:userId
export const addToCart = async (req, res) => {
  const { productId, quantity, size, color } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        userId: req.params.userId,
        items: [{ productId, quantity, size, color }],
      });
    } else {
      // Check if item already exists (based on product, size, color)
      const existingItemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ productId, quantity, size, color });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:userId
export const removeFromCart = async (req, res) => {
  const { productId, size, color } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
        )
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
