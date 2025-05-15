import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRoutes from "./routes/product_routes.mjs";
import cartRoutes from "./routes/cart_routes.mjs";
import recommendationRoutes from "./routes/recommendation_routes.mjs";
import connectDB from "./config/db.mjs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";


// __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

await connectDB(MONGOURL);

// API routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/recommendations", recommendationRoutes);

const clientBuildPath = path.resolve(__dirname, "E:/مواد كلية الهندسه/رابعه حاسبات/my year 2024-2025/ترم ثاني/E- commerce Lectures 2024/Sections Eng- wasfy 2025/E-Commerce-Fashion-web-project/front/dist");

app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
