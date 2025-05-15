const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch products error:', error);
    throw error;
  }
}

async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch product");
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch product error:', error);
    throw error;
  }
}

async function addToCart(productId, quantity) {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add to cart");
    }
    return await response.json();
  } catch (error) {
    console.error('Add to cart error:', error);
    throw error;
  }
}

async function getCart() {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get cart");
    }
    return await response.json();
  } catch (error) {
    console.error('Get cart error:', error);
    throw error;
  }
}

export { fetchProducts, fetchProductById, addToCart, getCart };