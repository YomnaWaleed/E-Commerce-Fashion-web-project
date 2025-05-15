import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRecommendations from '../hooks/useRecommendations';
import Recommendations from './Recommendations';
import AddToCartButton from './AddToCartButton';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recommendations
  const { recommendations, loading: recLoading, error: recError } = useRecommendations(
    product?.category,
    product?._id
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-main">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          {product.gender && <p><strong>Gender:</strong> {product.gender}</p>}
          {product.productType && <p><strong>Type:</strong> {product.productType}</p>}
          {product.usage && <p><strong>Usage:</strong> {product.usage}</p>}
          
          {/* Add to Cart Button */}
          <div className="add-to-cart-container">
                <AddToCartButton 
                product={product} 
                userId="user123"
                />
            </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {!recLoading && !recError && recommendations.length > 0 && (
        <Recommendations recommendations={recommendations} />
      )}
    </div>
  );
};

export default ProductDetail;