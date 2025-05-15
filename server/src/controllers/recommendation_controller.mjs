import Product from "../models/product_model.mjs"; 

export const getRecommendations = async (req, res) => {
  try {
    const recommended = await Product.find({
      category: { $in: ["Dresses", "Tops"] },
    });
    res.json(recommended);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recommendations." });
  }
};
