// src/pages/ShopPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FoodItem from "../../components/FoodItem/FoodItem";

const ShopPage = () => {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/listByShop/${shopId}`
        );
        setProducts(response.data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [shopId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl py-16 px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-8 auto-cols-min">
        {products.map((product, index) => (
          <div key={index} className="shrink-0 w-full">
            <FoodItem
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
