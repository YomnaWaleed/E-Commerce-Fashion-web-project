import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import useProducts from './hooks/useProduct.jsx';
import './App.css';

function App() {
  const { products, categories, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <div className="category-filter">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              {loading && <p>Loading products...</p>}
              {error && <p>Error loading products: {error}</p>}
              <Products products={filteredProducts} />
            </>
          } />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;