import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// 🔥 ADD THIS
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-fx2wixnsdm6vbd2d.us.auth0.com" // 👈 REAL DOMAIN (dashboard se)
      clientId="wY9DLAKiDxXY64oSnv24oHsNiPJAk6gg" // 👈 REAL CLIENT ID
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}>
      <BrowserRouter>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
);
