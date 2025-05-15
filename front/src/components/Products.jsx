import { useState } from "react";
import useProducts from "../hooks/useProduct";
import { Link } from "react-router-dom";

export default function ProductList() {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <label className="mr-2 font-medium">Category:</label>
          <select
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">Sort by Price:</label>
          <select
            className="p-2 border rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="border p-4 rounded shadow bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-contain"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>{product.price} EGP</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
