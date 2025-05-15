import useCart from '../hooks/useCart';

const AddToCartButton = ({ product, userId }) => {
  const { addToCart, loading } = useCart(userId);

  const handleAddToCart = async () => {
    await addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <button 
      onClick={handleAddToCart}
      disabled={loading}
      className={`add-to-cart-btn ${loading ? 'loading' : ''}`}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Adding...
        </>
      ) : (
        <>
          <span className="cart-icon">🛒</span>
          Add to Cart
        </>
      )}
    </button>
  );
};

export default AddToCartButton;