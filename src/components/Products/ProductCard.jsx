import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <Link to={`/product/${item.id}`}>
      <div className="border-2 border-blue-500 p-3 rounded-lg hover:scale-105 transition ">
        <div className="h-[280px] w-[230px] object-cover rounded-md flex items-center justify-center ">
          <img src={item.img} className="h-full w-40 object-contain p-2" />
        </div>
        <h2 className="font-semibold">{item.title}</h2>
        <p className="text-primary font-bold">₹{item.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
