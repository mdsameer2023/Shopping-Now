import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Sidebar from "../components/Products/Sidebar";
import ProductCard from "../components/Products/ProductCard";

const ProductsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const searchFromURL = query.get("search") || "";
  const categoryFromURL = query.get("category") || "";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(searchFromURL);
  const [category, setCategory] = useState(
    categoryFromURL ? [categoryFromURL.toLowerCase()] : [],
  );
  const [sort, setSort] = useState("");
  const [price, setPrice] = useState(20000);
  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setSearch(searchFromURL);
    if (categoryFromURL) {
      setCategory([categoryFromURL.toLowerCase()]);
    }
  }, [searchFromURL, categoryFromURL]);

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const apiProducts = data.map((item) => ({
          id: item.id,
          title: item.title,
          price: Math.floor(item.price * 80),
          category: item.category.toLowerCase(), // ✅ FIX
          img: item.image,
        }));
        setProducts(apiProducts);
      });
  }, []);

  // ✅ FETCH CATEGORY
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // 🔍 FILTER
  let filtered = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  // ✅ CATEGORY FIX
  if (category.length > 0) {
    filtered = filtered.filter((item) =>
      category.includes(item.category.toLowerCase()),
    );
  }

  filtered = filtered.filter((item) => item.price <= price);

  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);

  // 🔥 PAGINATION
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (products.length === 0) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-5 p-4 sm:p-5">
      {/* 🔥 SIDEBAR */}
      <Sidebar
        setCategory={(val) => {
          setCategory(val.map((c) => c.toLowerCase())); // ✅ FIX
          setCurrentPage(1);
        }}
        setSort={setSort}
        setPrice={setPrice}
        categories={categories}
      />

      {/* 🔥 RIGHT */}
      <div className="flex-1">
        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 mb-4 w-full rounded-full "
        />

        {/* 🔥 PRODUCTS */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 ">
            {currentProducts.map((item) => (
              <div key={item.id} className="flex">
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-20 text-2xl text-red-500 text-bold ">
            No products found 😢
          </p>
        )}

        {/* 🔥 PAGINATION */}
        <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-full">
            <ChevronLeft size={18} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-full ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white hover:bg-red-500 transition-all hover:scale-105"
                  : "bg-gray-200 hover:bg-red-500 hover:text-white transition-all hover:scale-110"
              }`}>
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 border rounded-full">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
