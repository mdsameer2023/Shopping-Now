import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // 🔥 FETCH API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (products.length === 0) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="mt-14 mb-12">
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
          {products.map((data) => (
            <Link to={`/product/${data.id}`} key={data.id}>
              <div className="space-y-3 cursor-pointer hover:scale-105 transition duration-300">
                {/* Image */}
                <img
                  src={data.image}
                  alt={data.title}
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
                    ₹{Math.floor(data.price * 80)}
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
