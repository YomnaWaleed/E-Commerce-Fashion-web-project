import useProducts from "../hooks/useProduct";
import { Link } from "react-router-dom";

export default function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="border p-4 rounded shadow bg-white"
        >
          <img src={product.image} alt={product.name} className="h-40 w-full object-contain" />
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p>{product.price} EGP</p>
        </Link>
      ))}
    </div>
  );
}
