import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import { CartProvider } from "./hooks/useCart";
import Recommendations from "./components/Recommendations";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
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
