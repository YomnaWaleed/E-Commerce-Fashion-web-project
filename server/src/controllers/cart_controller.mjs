import Cart from '../models/cart_model.mjs';

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, product } = req.body;
    
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId === product.productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};