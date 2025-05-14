import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProduct";
import { useCart } from "../hooks/useCart";
import BackButton from "../assets/BackButton";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id.toString() === id);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Black");

  if (!product) return <div className="p-4 text-center">Product not found</div>;

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    addToCart({ ...product, size, color }, quantity);
    navigate("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BackButton />
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-xl p-6">
        <div className="md:w-1/2 w-full h-[400px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain  rounded-lg border border-gray-200"
          />
        </div>

        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600">
            {product.price} EGP
          </p>

          <div>
            <label className="block font-medium mb-1">Size:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Color:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option>Black</option>
              <option>White</option>
              <option>Red</option>
              <option>Blue</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="quantity" className="text-gray-700 font-medium">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 p-2 border border-gray-300 rounded"
            />
          </div>

          <p className="text-xl font-semibold text-green-700">
            Total: {totalPrice} EGP
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
