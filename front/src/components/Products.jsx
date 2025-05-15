import { Link } from 'react-router-dom';

const Products = ({ products }) => {
  return (
    <div className="products-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Color: {product.color}</p>
            <p>Price: ${product.price}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Products;