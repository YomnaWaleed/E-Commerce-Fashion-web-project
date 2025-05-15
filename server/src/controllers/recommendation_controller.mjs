import Product from '../models/product_model.mjs';

export const getRecommendations = async (req, res) => {
  try {
    const { category, currentProductId } = req.params;
    
    const recommendations = await Product.find({
      category,
      _id: { $ne: currentProductId } // Exclude current product
    })
    .limit(10)
    .select('id name image price category'); // Only select necessary fields

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};