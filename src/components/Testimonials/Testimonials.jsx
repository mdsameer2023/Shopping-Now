import React from "react";
import Slider from "react-slick";
import { FaStar, FaCheckCircle } from "react-icons/fa";

const TestimonialData = [
  {
    id: 1,
    name: "Salman Khan",
    text: "Great shopping experience with fast delivery and quality products. The interface is smooth and reliable. Definitely one of the best online stores I’ve used.",
    img: "https://images.wallpapersden.com/image/download/salman-khan-smile-face_aG5taGiUmZqaraWkpJRma21lrWZna2U.jpg",
    rating: 5,
    date: "March 2026",
  },
  {
    id: 2,
    name: "Amir Khan",
    text: "Impressed with product quality and quick service. Easy to navigate platform and everything works smoothly. Highly recommended for daily shopping needs.",
    img: "https://w0.peakpx.com/wallpaper/872/625/HD-wallpaper-aamir-khan-actor-smiling-hat-men.jpg",
    rating: 4,
    date: "February 2026",
  },
  {
    id: 3,
    name: "Virat Kohli",
    text: "Amazing deals with smooth checkout. Delivery was on time and packaging was perfect. Shopping here feels fast, secure, and convenient.",
    img: "https://m.media-amazon.com/images/I/517+QGnFoCL._SX679_.jpg",
    rating: 5,
    date: "January 2026",
  },
  {
    id: 4,
    name: "Sachin Tendulkar",
    text: "A reliable platform with great variety and fair pricing. Customer support is responsive and helpful. Overall shopping experience is excellent.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-GEPz8lImX-X59yW_DBDH6WIQtOxB_seyw&s",
    rating: 5,
    date: "December 2025",
  },
  {
    id: 5,
    name: "Sundar Pichai",
    text: "A reliable platform with great variety and fair pricing. Customer support is responsive and helpful. Overall shopping experience is excellent.",
    img: "https://www.zdnet.com/a/img/resize/598c8f0296e0e94586938fa791dcd2c9372b2d69/2016/04/29/6f5863fa-7f35-41bb-8d8f-3e54479dc3da/sundar-pichai.jpg?auto=webp&fit=crop&height=1200&width=1200",
    rating: 5,
    date: "January 2026",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="py-12 mb-10 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* 🔥 HEADER */}
        <div className="text-center mb-10 max-w-[650px] mx-auto">
          <p className="text-sm text-purple-600 font-medium">
            Customer Experiences
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            What Our Happy Customers Say
          </h1>
          <p className="text-gray-500 text-sm mt-3">
            Discover real feedback from our valued customers who trust
            Shopping-Now for quality products, fast delivery, and a smooth
            shopping experience.
          </p>
        </div>

        {/* 🔥 SLIDER */}
        <Slider {...settings}>
          {TestimonialData.map((data) => (
            <div key={data.id} className="px-3">
              <div className="bg-primary/10 shadow-md rounded-xl p-6 flex flex-col gap-4 hover:shadow-xl transition hover:scale-105">
                {/* USER */}
                <div className="flex items-center gap-4">
                  <img
                    src={data.img}
                    alt={data.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{data.name}</h2>
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <FaCheckCircle />
                      <span>Verified Buyer</span>
                    </div>
                  </div>
                </div>

                {/* ⭐ RATING */}
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(data.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* REVIEW */}
                <p className="text-gray-600 text-sm leading-6">{data.text}</p>

                {/* DATE */}
                <p className="text-xs text-gray-400">Reviewed on {data.date}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
