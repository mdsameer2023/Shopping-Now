import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/website/footer-pattern.jpg";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
      className="text-white pt-10">
      <div className="bg-black/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 🔥 MAIN GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {/* 🔥 LOGO SECTION */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={footerLogo} alt="logo" className="w-12" />
                <h1 className="text-xl sm:text-2xl font-bold">Shopping-Now</h1>
              </div>
              <p className="text-gray-300 text-sm leading-6">
                Shopping-Now offers a seamless online shopping experience with
                quality products, great deals, fast delivery, and reliable
                support making your shopping simple, secure, and enjoyable every
                day.
              </p>

              <div className="mt-5 bg-white/10 p-3 rounded-md text-sm transition hover:scale-105">
                <p>Got Questions? Call us 24/7</p>
                <p className="text-blue-400 font-semibold mt-1">
                  +0123 456 789
                </p>
              </div>
            </div>

            {/* 🔥 USEFUL LINKS */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Useful Links</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link to="/" className="hover:text-green-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    How togreen-500
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-green-500">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            {/* 🔥 CUSTOMER SERVICE */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Customer Service</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link to="/" className="hover:text-green-500">
                    Payment Methods
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    Money-back guarantee!
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* 🔥 ACCOUNT */}
            <div>
              <h2 className="font-semibold text-lg mb-4">My Account</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link to="/login" className="hover:text-green-500">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    View Cart
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-green-500">
                    My Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-green-500">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 🔥 SOCIAL + ADDRESS */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-600/40 py-5">
            {/* SOCIAL */}
            <div className="flex gap-4 text-xl">
              <a
                href="https://www.instagram.com/tech_sameer.ai?igsh=MTY4MW5hbmU1YmF6dQ=="
                className="hover:text-red-400">
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/sameer.alam.869166"
                className="hover:text-blue-400">
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/in/sameer-alam-558821266/"
                className="hover:text-blue-400">
                <FaLinkedin />
              </a>
              <a
                href="https://www.linkedin.com/in/sameer-alam-558821266/"
                className="hover:text-cyan-500">
                <FaTwitter />
              </a>
            </div>

            {/* ADDRESS */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FaLocationArrow />
                <span>Bihar, Gaya Rafiganj</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMobileAlt />
                <span>+91 9065005514</span>
              </div>
            </div>
          </div>

          {/* 🔥 COPYRIGHT */}
          <div className="text-center text-sm text-gray-400 pb-5">
            Copyright © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">Sameer Alam</span>. All
            rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
