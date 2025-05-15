import fs from "fs";
import path from "path";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product_model.mjs";

dotenv.config();

const MONGOURL = process.env.MONGO_URL ;

const csvFilePath = path.resolve("E:/مواد كلية الهندسه/رابعه حاسبات/my year 2024-2025/ترم ثاني/E- commerce Lectures 2024/Sections Eng- wasfy 2025/E-Commerce-Fashion-web-project/server/fashion.csv");




async function connectDB() {
    try {
        await mongoose.connect(MONGOURL);
        console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    }
  }
  
  async function importData() {
    await connectDB();
  
    const products = [];
  
  
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        // Map CSV columns to your model fields
        // Make sure CSV headers match exactly or adjust accordingly
        const product = {
          id: row.ProductId,
          name: row.ProductTitle,
          category: row.SubCategory,    // SubCategory in CSV as per your schema
          color: row.Colour,
          image: row.ImageURL,
          price: Number(row.Price) || 0, // Assuming Price column exists, else set default 0
        };
  
        // Basic validation: skip if required fields missing
        if (product.id && product.name && product.category && product.color && product.image) {
          products.push(product);
        }
      })
      .on("end", async () => {
        console.log(`Parsed ${products.length} products from CSV.`);
  
        try {
          // Optionally clear existing data before importing
          await Product.deleteMany({});
          console.log("Old products deleted.");
  
          // Insert new products
          await Product.insertMany(products);
          console.log("Products imported successfully.");
  
          process.exit(0);
        } catch (err) {
          console.error("Error importing products:", err);
          process.exit(1);
        }
      });
  }
  
  importData();