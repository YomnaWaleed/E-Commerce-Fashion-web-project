import { Link } from 'react-router-dom';

const Recommendations = ({ recommendations }) => {
  return (
    <div className="recommendations-section">
      <h3>You may also like</h3>
      <div className="recommendations-grid">
        {recommendations.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="recommendation-item">
            <img 
              src={product.image} 
              alt={product.name} 
              className="recommendation-image" 
            />
            <p className="recommendation-title">{product.name}</p>
            <p className="recommendation-price">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;