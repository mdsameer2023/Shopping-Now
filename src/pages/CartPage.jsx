import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const handling = 20;
  const gst = Math.floor(subtotal * 0.18);

  const total = subtotal + shipping + handling + gst;

  return (
    <div className="p-4 sm:p-10">
      {/* 🔗 BREADCRUMB */}
      <div className="text-sm text-gray-500 mb-4 flex gap-2">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/products">Shop</Link>
        <span>›</span>
        <span className="text-black">Shopping Cart</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* PRODUCTS */}
        <div className="md:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <p>Your cart is empty 😢</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded shadow gap-4">
                {/* IMAGE + NAME */}
                <div className="flex items-center gap-4">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.img}
                      className="w-20 h-20 object-cover rounded cursor-pointer"
                    />
                  </Link>

                  <div>
                    <h2 className="font-bold">{item.title}</h2>
                    <p className="text-gray-500">₹{item.price}</p>
                  </div>
                </div>

                {/* QTY */}
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, e.target.value)}
                  className="border w-16 p-1 text-center"
                />

                {/* TOTAL */}
                <p className="font-semibold">₹{item.price * item.qty}</p>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500">
                  Remove❌
                </button>
              </div>
            ))
          )}
        </div>

        {/* SUMMARY */}
        <div className="border p-5 rounded shadow h-fit">
          <h2 className="font-bold text-lg mb-4">Cart Total</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Handling Fee:</span>
            <span>₹{handling}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>GST (18%):</span>
            <span>₹{gst}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <Link to="/checkout">
            <button className="w-full mt-5 bg-primary text-white py-2 rounded-full hover:bg-red-500 text-bold text-1xl">
              Place Order
            </button>
          </Link>

          <input
            placeholder="Coupon code"
            className="border p-2 w-full mt-4 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
