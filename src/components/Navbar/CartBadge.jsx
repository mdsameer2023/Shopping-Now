import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CartBadge = () => {
  const { cart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Link to="/cart">
      {" "}
      {/* 👈 WRAP HERE */}
      <div className="relative cursor-pointer">
        <FaCartShopping className="text-2xl" />

        {total > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {total}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartBadge;
