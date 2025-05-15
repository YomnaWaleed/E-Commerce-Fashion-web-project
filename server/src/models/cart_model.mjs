import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 }
}, { timestamps: true });

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Simple implementation - in production use proper auth
  items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;