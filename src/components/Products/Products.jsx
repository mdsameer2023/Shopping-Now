import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getProducts, getCachedProducts, formatPrice } from "../../services/products";

const Products = () => {
  const [products, setProducts] = useState(() => getCachedProducts() || []);
  const [loading, setLoading] = useState(() => getCachedProducts() === null);
  const [error, setError] = useState("");

  // 🔥 FETCH API
  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch(() => {
        if (active) setError("Unable to load products. Please refresh the page.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  if (loading) {
    return <h2 role="status" className="text-center mt-10 motion-safe:animate-pulse">Loading...</h2>;
  }
  if (error) return <h2 className="text-center mt-10">{error}</h2>;
  if (!products.length) return <h2 className="text-center mt-10">No products available</h2>;

  return (
    <div className="mt-14 mb-12 product-enter">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-green-500">Top Selling Products for you</p>
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
          {products.map((data, index) => (
            <Link to={`/product/${data.id}`} key={data.id}>
              <div className="space-y-3 cursor-pointer hover:scale-105 transition duration-300">
                {/* Image */}
                <img
                  src={data.image}
                  alt={data.title}
                  loading={index < 5 ? "eager" : "lazy"}
                  decoding="async"
                  width="150"
                  height="220"
                  className="h-[220px] w-[150px] object-contain bg-white p-2 rounded-md"
                />

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-sm line-clamp-1">
                    {data.title}
                  </h3>

                  <p className="text-xs text-gray-500 capitalize">
                    {data.category}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating?.rate}</span>
                  </div>

                  {/* Price */}
                  <p className="font-bold text-primary">
                    {formatPrice(data.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button className="mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md hover:scale-105 transition">
            <Link to="/products">View All Products</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
