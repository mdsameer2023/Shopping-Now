import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import { motion, AnimatePresence } from "framer-motion";

import { CiFacebook, CiTwitter } from "react-icons/ci";
import { FaInstagram, FaWhatsapp, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  // 🔥 FETCH SINGLE PRODUCT
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = {
          id: data.id,
          title: data.title,
          price: Math.floor(data.price * 80),
          category: data.category,
          img: data.image,
          rating: data.rating?.rate || 4,
          reviews: data.rating?.count || 100,
          desc: data.description,
          stock: true,
        };

        setProduct(formatted);
        setSelectedImg(formatted.img);
      });
  }, [id]);

  // 🔄 LOADING
  if (!product) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  return (
    <div className="p-4 sm:p-10">
      {/* 🔗 BREADCRUMB */}
      <div className="text-sm text-gray-500 mb-4 flex gap-2">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/products">Product</Link>
        <span>›</span>
        <span className="text-black font-medium">Details</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* 🔥 IMAGE */}
        <div className="flex justify-center">
          <div className="w-full h-[300px] md:h-[450px] bg-gray-100 rounded-lg flex items-center justify-center transition hover:scale-105 shadow-md  hover:shadow-red-500 ">
            <img src={selectedImg} className="h-full object-contain" />
          </div>
        </div>

        {/* 🔥 DETAILS */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">{product.title}</h1>

          {/* ⭐ RATING */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-400">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="text-sm text-gray-500">
              ({product.reviews} Reviews)
            </span>
          </div>

          <p className="text-xl text-primary mt-2">₹{product.price}</p>

          {/* STOCK */}
          <p className="text-green-500 mt-2 font-semibold">In Stock ✅</p>

          <p className="text-gray-500 mt-2 text-sm">{product.desc}</p>

          {/* QTY */}
          <div className="mt-4">
            <p>Qty:</p>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="border w-16 p-1"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <button
              onClick={() =>
                addToCart(
                  {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    img: product.img,
                  },
                  qty,
                )
              }
              className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-200 to-pink-500 hover:scale-105 transition">
              🛒 Add to Cart
            </button>

            <button
              onClick={() =>
                addToWishlist({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  img: product.img,
                })
              }
              className="border-2 border-green-500 rounded-full px-6 py-2 flex items-center gap-2 hover:bg-pink-400 hover:text-white ">
              <FaRegHeart className="text-red-500" /> Wishlist
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Category: {product.category}
          </p>

          {/* SHARE */}
          <div className="flex gap-3 mt-3 items-center">
            <span>🔗 Share:</span>
            <CiFacebook className="hover:text-blue-500 text-md"/>
            <CiTwitter className="hover:text-cyan-500 text-md"/>
            <FaInstagram className="hover:text-red-500 text-md" />
            <FaWhatsapp className="hover:text-green-500 text-md" />
          </div>
        </div>
      </div>

      {/* 🔥 TABS */}
      <div className="mt-10">
        <div className="flex gap-6 border-b pb-2 overflow-x-auto">
          {["desc", "info", "ship"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`pb-2 ${
                tab === item ? "border-b-2 border-black" : ""
              }`}>
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 text-gray-600">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              {tab === "desc" && <p>{product.desc}</p>}
              {tab === "info" && <p>Premium quality product</p>}
              {tab === "ship" && <p>Delivery in 3-5 days 🚚</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
