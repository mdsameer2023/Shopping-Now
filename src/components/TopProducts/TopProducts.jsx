import React from "react";
import { useNavigate } from "react-router-dom";
import Img1 from "../../assets/shirt/shirt.png";
import Img2 from "../../assets/shirt/shirt2.png";
import Img3 from "../../assets/shirt/shirt3.png";

import { FaStar } from "react-icons/fa";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Casual Wear",
    description:
      "Experience premium comfort with modern casual wear designed for everyday elegance, offering perfect fit and timeless style.",
  },
  {
    id: 2,
    img: Img2,
    title: "Printed shirt",
    description:
      "Upgrade your wardrobe with stylish printed shirts crafted for a bold look, combining high-quality material with modern design.",
  },
  {
    id: 3,
    img: Img3,
    title: "Women shirt",
    description:
      "Discover elegant women’s fashion with versatile shirts that blend comfort, premium fabric, and refined everyday styling.",
  },
];

const TopProducts = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p>

          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>

          <p data-aos="fade-up" className="text-sm text-gray-500 max-w-[500px]">
            Explore our handpicked collection of premium products, crafted with
            modern design and exceptional comfort — delivering a refined
            shopping experience tailored for your lifestyle.
          </p>
        </div>

        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <div
              key={data.id}
              data-aos="zoom-in"
              className="
                rounded-2xl 
                bg-white dark:bg-gray-800 
                relative 
                shadow-xl 
                duration-300 
                group 
                max-w-[300px]
                hover:shadow-2xl 
                hover:-translate-y-2
                hover:bg-green-500/80 
                dark:hover:bg-primary
                hover:text-black
              ">
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.img}
                  alt=""
                  className="
                    max-w-[140px] 
                    block mx-auto 
                    transform -translate-y-20 
                    group-hover:scale-110 
                    duration-300 
                    drop-shadow-lg
                  "
                />
              </div>

              {/* details section */}
              <div className="p-4 text-center ">
                {/* ⭐ rating */}
                <div className="w-full flex items-center justify-center gap-1 mb-2">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>

                <h1 className="text-xl font-bold">{data.title}</h1>

                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>

                {/* 🔥 BUTTON (ROUTING ADDED) */}
                <button
                  onClick={() => navigate("/products")}
                  className="
                    mt-4 
                    bg-gradient-to-r from-primary to-secondary 
                    hover:scale-105 
                    duration-300 
                    text-white 
                    py-1 px-4 
                    rounded-full 
                    group-hover:bg-white 
                    group-hover:text-black
                  ">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
