import { formatPrice } from "../../services/products";

const Sidebar = ({ setCategory, setSort, setPrice, categories = [], selected = [], price }) => {

  const handleCheckbox = (value) => {
    let updated = [...selected];

    if (updated.includes(value)) {
      updated = updated.filter((item) => item !== value);
    } else {
      updated.push(value);
    }

    setCategory(updated);
  };

  return (
    <div className="w-full md:w-60 border p-4 rounded space-y-5">
      <h2 className="font-bold text-lg">Filters</h2>

      {/* 🔥 CATEGORY (API BASED) */}
      <div>
        <p className="font-semibold mb-2">Category</p>

        {categories.length > 0 ? (
          categories.map((cat, i) => (
            <label key={i} className="block capitalize">
              <input
                type="checkbox"
                checked={selected.includes(cat.toLowerCase())}
                onChange={() => handleCheckbox(cat.toLowerCase())}
                className="mr-2"
              />
              {cat}
            </label>
          ))
        ) : (
          <p className="text-sm text-gray-400">No categories available</p>
        )}
      </div>

      {/* 💰 PRICE RANGE */}
      <div>
        <p className="font-semibold mb-2">Price</p>

        <input
          type="range"
          min="0"
          max="20000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full"
        />

        <p className="text-sm text-gray-500">Up to {formatPrice(price)}</p>
      </div>

      {/* 🔄 SORT */}
      <div>
        <p className="font-semibold mb-2">Sort</p>

        <p
          onClick={() => setSort("low")}
          className="cursor-pointer hover:text-blue-500">
          Low → High
        </p>
        <p
          onClick={() => setSort("high")}
          className="cursor-pointer hover:text-blue-500">
          High → Low
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
