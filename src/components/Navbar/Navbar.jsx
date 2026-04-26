import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

import { IoMdSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

import DarkMode from "./DarkMode";
import CartBadge from "./CartBadge";
import UserDropdown from "./UserDropdown";
import { getUserLocation } from "./Location";

import { WishlistContext } from "../../context/WishlistContext";

const Menu = [
  { name: "For You", link: "/" },
  { name: "Fashion", link: "/products?category=women's clothing" },
  { name: "Mobile", link: "/products?category=mobile" },
  { name: "Beauty", link: "/products?category=jewelery" },
  { name: "Home", link: "/" },
  { name: "Electronic", link: "/products?category=electronics" },
  { name: "Laptop", link: "/products?category=laptop" },
  { name: "Book", link: "/products?category=book" },
  { name: "Toy & Games", link: "/products?category=toy&game" },
];

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("Location");
  const [showReminder, setShowReminder] = useState(false);

  const { wishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  // ✅ FETCH FAKE API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);

  // ⏱️ LOGIN REMINDER
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReminder(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 🔍 SEARCH
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setActiveIndex(-1);

    if (value.length > 0) {
      const filtered = allProducts.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  // ⌨️ KEYBOARD NAVIGATION
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter") {
      if (activeIndex >= 0) {
        navigate(`/product/${suggestions[activeIndex].id}`);
      } else {
        navigate(`/products?search=${search}`);
      }
      setSuggestions([]);
    }
  };

  const handleLocationClick = async () => {
    try {
      const city = await getUserLocation();
      setLocation(city);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {/* 🔥 LOGIN REMINDER */}
      {showReminder && (
        <div className="fixed bottom-5 right-5 bg-white shadow-lg p-4 rounded-lg z-50 w-[250px]">
          <p className="text-sm mb-2">Login for better experience 🔥</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-3 py-1 rounded w-full">
            Login Now
          </button>
          <button
            onClick={() => setShowReminder(false)}
            className="text-sm mt-2 text-black text-bold w-full">
            Close
          </button>
        </div>
      )}

      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow">
        {/* 🔴 TOP BAR */}
        <div className="bg-red-400/40  dark:bg-cyan-500/80 px-4 py-2 flex flex-wrap items-center justify-between gap-3">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            <button
              className="sm:hidden text-xl"
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <IoClose /> : <FaBars />}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} className="w-8" />
              <h1 className="font-bold text-lg">Shopping-Now</h1>
            </Link>
          </div>

          {/* 🔍 SEARCH (RESPONSIVE) */}
          <div className="relative w-full md:w-[50%]">
            <input
              type="text"
              placeholder="Search for Products..."
              value={search}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full border-2 border-blue-500 px-4 py-2 rounded-full dark:border-red-500"
            />

            {/* 🔥 DROPDOWN */}
            {suggestions.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white dshadow-lg rounded-lg z-50 max-h-72 overflow-y-auto">
                {suggestions.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      setSuggestions([]);
                    }}
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
                      index === activeIndex
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}>
                    <img
                      src={item.image}
                      className="w-10 h-10 object-contain"
                    />
                    <div>
                      <p className="text-sm">{item.title.slice(0, 30)}</p>
                      <p className="text-xs text-gray-500">
                        ₹{Math.floor(item.price * 80)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <Link to="/wishlist" className="relative text-red-500 text-lg">
              <FaRegHeart />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <CartBadge />

            <span
              onClick={handleLocationClick}
              className="hidden sm:flex items-center gap-1 cursor-pointer">
              <IoLocationOutline />
              {location}
            </span>

            <button
              onClick={() => navigate("/login")}
              className="border-2 border-blue-500 px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white dark:bg-black dark:hover:bg-blue-500">
              Login
            </button>

            <DarkMode />
            <UserDropdown />
          </div>
        </div>

        {/* 🔥 MENU */}
        <div className="bg-white dark:bg-gray-900 border- ">
          {/* DESKTOP */}
          <div className="hidden sm:flex justify-center gap-8 py-2 font-medium ">
            {Menu.map((item, i) => (
              <Link key={i} to={item.link} className="hover:text-blue-500">
                {item.name}
              </Link>
            ))}
          </div>

          {/* MOBILE */}
          <div className="sm:hidden flex gap-4 overflow-x-auto px-4 py-2 whitespace-nowrap">
            {Menu.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-red-500">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 shadow px-4 py-3">
          {Menu.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              onClick={() => setMenuOpen(false)}
              className="block py-2 border-b">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
