import Product from "../models/product_model.mjs";

// @desc    Recommend products based on category of current product
// @route   GET /api/recommendations/:productId
export const getRecommendations = async (req, res) => {
  try {
    const currentProduct = await Product.findById(req.params.productId);

    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Simple logic: Recommend 4 other products from the same category
    const recommendations = await Product.find({
      _id: { $ne: currentProduct._id }, // exclude current product
      category: currentProduct.category,
    })
      .limit(4);

    res.status(200).json(recommendations);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
