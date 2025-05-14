import { useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProduct";

export default function ProductList() {
  const { products, filterByCategory, sortByPrice } = useProducts();
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const handleFilter = (e) => {
    setCategory(e.target.value);
    filterByCategory(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    sortByPrice(e.target.value);
  };

  return (
    <>
      <p className=" text-blue-900 text-5xl p-10">Fashionest</p>
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <select
            value={category}
            onChange={handleFilter}
            className="p-2 border"
          >
            <option value="">All Categories</option>
            <option value="Tops">Tops</option>
            <option value="Dresses">Dresses</option>
            <option value="Shoes">Shoes</option>
          </select>

          <select value={sort} onChange={handleSort} className="p-2 border">
            <option value="">Sort</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <Link
            to="/recommendations"
            className=" text-3xl border-2 border-green-700  rounded-full p-3 bg-green-700 text-white hover:bg-white hover:text-green-700"
          >
            Recommendation
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className=" rounded-lg border-2 p-4 hover:shadow hover:border-gray-500"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-2"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">{product.price} EGP</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
