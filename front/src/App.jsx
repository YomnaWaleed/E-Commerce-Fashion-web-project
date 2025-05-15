import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/Products.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Cart from "./components/Cart.jsx";
import { CartProvider } from "./hooks/useCart.jsx";
import Recommendations from "./components/Recommendations.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}