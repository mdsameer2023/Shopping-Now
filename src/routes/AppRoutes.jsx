import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
// import WishlistPage from "../pages/WishlistPage";
import WishlistPage from "../pages/WishlistPage";
import OrderSuccess from "../pages/OrderSuccess";
import LoginPage from "../pages/LoginPage";

const AppRoutes = ({ handleOrderPopup }) => {
  return (
    <Routes>
      <Route path="/" element={<Home handleOrderPopup={handleOrderPopup} />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/success" element={<OrderSuccess />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
AppRoutes.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired,
};

export default AppRoutes;
