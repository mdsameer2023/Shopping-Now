import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [orderPopup, setOrderPopup] = useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  useEffect(() => {
    // 🔥 PROPER AOS CONFIG
    AOS.init({
      duration: 700, // animation speed
      easing: "ease-in-out",
      once: true, // ek baar hi chale
      offset: 0, // 👈 FIX (important)
    });

    // 🔥 Refresh after load (important fix)
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white">
      <ScrollToTop />

      <Navbar handleOrderPopup={handleOrderPopup} />

      <AppRoutes handleOrderPopup={handleOrderPopup} />

      <Footer />

      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

export default App;
