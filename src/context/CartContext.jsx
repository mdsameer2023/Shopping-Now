import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ LOAD FROM LOCALSTORAGE
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ ADD TO CART
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        );
      }

      return [...prev, { ...product, qty }];
    });
  };

  // ✅ REMOVE FROM CART
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ UPDATE QTY
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Number(qty) } : item,
      ),
    );
  };

  // 🔥 CLEAR CART (PAYMENT SUCCESS)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart, // 👈 IMPORTANT
      }}>
      {children}
    </CartContext.Provider>
  );
};
