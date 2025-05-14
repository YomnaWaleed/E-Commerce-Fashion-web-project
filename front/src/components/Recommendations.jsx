import { Link } from "react-router-dom";
import useProducts from "../hooks/useProduct";
import BackButton from "../assets/BackButton";

export default function Recommendations() {
  const { products } = useProducts();
  const outfits = products.filter(
    (p) => p.category === "Dresses" || p.category === "Tops"
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex gap-6">
        <BackButton />
        <h1 className="text-3xl font-bold mb-6 text-center">
          Recommended Outfits
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {outfits.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-600 mt-1">{item.price} EGP</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
