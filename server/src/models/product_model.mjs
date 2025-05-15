import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0 },
  gender: { type: String },
  productType: { type: String },
  usage: { type: String }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;