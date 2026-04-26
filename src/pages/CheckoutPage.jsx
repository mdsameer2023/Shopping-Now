import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [payment, setPayment] = useState("cod");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    // COD FLOW
    if (payment === "cod") {
      alert("Order placed successfully ✅");
      clearCart();
      navigate("/success");
      return;
    }

    // RAZORPAY FLOW
    const options = {
      key: "rzp_test_XXXXXXXX", // 👈 Replace with your key
      amount: total * 100,
      currency: "INR",
      name: "Shopping Now",
      description: "Order Payment",
      image: "https://cdn-icons-png.flaticon.com/512/263/263142.png",

      handler: function (response) {
        console.log("Payment Success:", response);
        clearCart();
        navigate("/success");
      },

      prefill: {
        name: "Sameer",
        email: "test@gmail.com",
        contact: "9999999999",
      },

      theme: {
        color: "#f59e0b",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* LEFT SECTION */}
        <div className="md:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Billing Details
          </h2>

          {/* FORM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="First Name" className="input" />
            <input placeholder="Last Name" className="input" />
            <input placeholder="Email" className="input sm:col-span-2" />
            <input placeholder="Phone" className="input sm:col-span-2" />
            <input placeholder="Address" className="input sm:col-span-2" />
            <input placeholder="City" className="input" />
            <input placeholder="Zip Code" className="input" />
          </div>

          {/* PAYMENT */}
          <h2 className="text-lg sm:text-xl font-semibold mt-6 mb-3">
            Payment Method
          </h2>

          <div className="space-y-2">
            <label className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />
              Cash on Delivery
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                checked={payment === "card"}
                onChange={() => setPayment("card")}
              />
              Credit / Debit Card
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                checked={payment === "upi"}
                onChange={() => setPayment("upi")}
              />
              UPI Payment
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                checked={payment === "razorpay"}
                onChange={() => setPayment("razorpay")}
              />
              Razorpay (Recommended ⚡)
            </label>
          </div>

          {/* CONDITIONAL */}
          {payment === "card" && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="Card Number"
                className="input sm:col-span-2"
              />
              <input placeholder="Expiry" className="input" />
              <input placeholder="CVV" className="input" />
            </div>
          )}

          {payment === "upi" && (
            <input placeholder="Enter UPI ID" className="input mt-4 w-full" />
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow h-fit md:sticky md:top-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm sm:text-base mb-2">
              <span>
                {item.title} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr className="my-3" />

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg shadow hover:scale-105 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
