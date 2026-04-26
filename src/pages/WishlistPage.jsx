import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="p-4 sm:p-10">
      {/* TITLE */}
      {/* 🔗 BREADCRUMB */}
      <div className="text-sm text-gray-500 mb-4 flex gap-2">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/products">Shop</Link>
        <span>›</span>
        <span className="text-black">WishList Cart</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
        My Wishlist <FaRegHeart className="text-red-500" />
      </h1>

      {/* EMPTY */}
      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">Wishlist Empty 💔</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center gap-4 border p-4 rounded-lg shadow-sm hover:shadow-md shadow-red-500 hover:shadow-xl hover:shadow-cyan-500 transition hover:scale-105 ">
              {/* LEFT SIDE */}
              <div className="flex gap-4 items-center">
                {/* IMAGE CLICK → PRODUCT PAGE */}
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.img}
                    className="w-20 h-20 object-cover rounded cursor-pointer"
                  />
                </Link>

                {/* DETAILS */}
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>

                  {/* PRICE */}
                  <p className="text-primary font-bold">₹{item.price}</p>

                  {/* STOCK */}
                  <p
                    className={`text-sm ${
                      item.stock ? "text-green-500" : "text-red-500"
                    }`}>
                    {item.stock !== false ? "In Stock ✅" : "Out of Stock ❌"}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE BUTTONS */}
              <div className="flex gap-3 flex-wrap">
                {/* ADD TO CART */}
                <button
                  disabled={item.stock === false}
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      img: item.img,
                    })
                  }
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    item.stock !== false
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}>
                  Add to Cart
                </button>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 border px-4 py-2 rounded hover:bg-red-100">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
