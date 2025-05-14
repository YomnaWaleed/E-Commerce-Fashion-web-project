import { useState, useEffect } from "react";

const dummyData = [
  {
    id: 1,
    name: "Floral Dress",
    price: 500,
    category: "Dresses",
    image: "/R.jpg",
  },
  {
    id: 2,
    name: "Casual Top",
    price: 200,
    category: "Tops",
    image: "/R.jpg",
  },
  {
    id: 3,
    name: "White Sneakers",
    price: 350,
    category: "Shoes",
    image: "/3.jpg",
  },
  {
    id: 4,
    name: "Summer Dress",
    price: 450,
    category: "Dresses",
    image: "/o.jpg",
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: 600,
    category: "Tops",
    image: "/j.webp",
  },
];

export default function useProducts() {
  const [products, setProducts] = useState(dummyData);
  const [filtered, setFiltered] = useState(dummyData);

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  const filterByCategory = (category) => {
    if (!category) return setFiltered(products);
    const filteredItems = products.filter((item) => item.category === category);
    setFiltered(filteredItems);
  };

  const sortByPrice = (order) => {
    const sorted = [...filtered].sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
    setFiltered(sorted);
  };
  console.log(setProducts);
  return {
    products: filtered,
    filterByCategory,
    sortByPrice,
  };
}
