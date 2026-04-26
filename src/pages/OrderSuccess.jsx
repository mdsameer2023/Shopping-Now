import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <p className="text-gray-500 mb-6">Thank you for your purchase ❤️</p>

      <Link to="/">
        <button className="bg-primary text-white px-6 py-2 rounded-full">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default OrderSuccess;
