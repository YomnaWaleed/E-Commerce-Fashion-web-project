import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRecommendations from '../hooks/useRecommendations';
import Recommendations from './Recommendations';

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

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="detail-image" />
      <div className="detail-info">
        <h1>{product.name}</h1>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Color:</strong> {product.color}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        {product.gender && <p><strong>Gender:</strong> {product.gender}</p>}
        {product.productType && <p><strong>Type:</strong> {product.productType}</p>}
        {product.usage && <p><strong>Usage:</strong> {product.usage}</p>}
      </div>

      {/* Recommendations Section */}
      {!recLoading && !recError && recommendations.length > 0 && (
        <Recommendations recommendations={recommendations} />
      )}
    </div>
  );
};

export default ProductDetail;