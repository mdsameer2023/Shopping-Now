// import React from "react";
import Image1 from "../../assets/hero/women.png";
import Image2 from "../../assets/hero/shopping.png";
import Image3 from "../../assets/hero/sale.png";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% off on all Men's Wear",
    description:
      "Upgrade your wardrobe with premium men's fashion, crafted for comfort, style, and everyday confidence at unbeatable prices.",
  },
  {
    id: 2,
    img: Image2,
    title: "30% off on all Women's Wear",
    description:
      "Discover elegant women’s collections designed with modern trends, premium fabrics, and timeless style for every occasion.",
  },
  {
    id: 3,
    img: Image3,
    title: "70% off on all Products Sale",
    description:
      "Shop top-quality products at exclusive discounts and enjoy a seamless, fast, and trusted shopping experience all in one place.",
  },
];

const Hero = () => {
  const navigate = useNavigate();

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 dark:bg-red-100/20 dark:text-pink-400 flex justify-center items-center duration-200">
      {/* background pattern */}
      <div className="h-[700px] w-[700px] bg-red-500/40 dark:bg-cyan-500/80 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-8"></div>

      {/* hero section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                    {data.title}
                  </h1>

                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="0"
                    className="text-sm sm:text-base max-w-[500px]">
                    {data.description}
                  </p>

                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="0">
                    <button
                      onClick={() => navigate("/products")}
                      className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                      Order Now
                    </button>
                  </div>
                </div>

                {/* image section */}
                <div className="order-1 sm:order-2">
                  <div
                    data-aos="zoom-in"
                    data-aos-delay="0"
                    className="relative z-10">
                    <img
                      src={data.img}
                      alt=""
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-110 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
