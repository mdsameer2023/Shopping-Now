# Shopping-Now Architecture

This document describes the current implementation of Shopping-Now. See [README.md](README.md) for installation commands, application URLs, and the endpoint list.

## 1. System Overview

Shopping-Now has two independently runnable parts:

- **Storefront:** A React 18 single-page application built with Vite. It reads an external product catalog, uses Auth0 for hosted authentication, and stores shopping state in the browser.
- **Backend:** An Express application with Mongoose models for users, products, and orders. Its REST endpoints are implemented but are not currently consumed by the storefront.

```text
Browser
  |
  React storefront
    |-- React Router ------> Page components
    |-- Product service ---> External JSON catalog and image host
    |-- Auth0 SDK ---------> Auth0 hosted authentication
    |-- Cart/Wishlist ----> React Context + localStorage
    |-- Theme ------------> localStorage
    |-- Location ---------> Browser geolocation + BigDataCloud
    `-- Checkout ---------> Local demo flow / Razorpay scaffold

Separate backend
  REST client
    |
  Express routes
    |-- Authentication and admin middleware
    |-- Controllers
    `-- Mongoose models ---> MongoDB
```

There is currently no storefront-to-Express request path, shared login session, or shared catalog identifier scheme. Running the frontend does not require the local backend or MongoDB.

## 2. Frontend Composition

### Application Bootstrap

[`src/main.jsx`](src/main.jsx) mounts the application and imports the global CSS and carousel styles. Providers are composed in this order:

```text
React.StrictMode
  Auth0Provider
    BrowserRouter
      CartProvider
        WishlistProvider
          App
```

[`src/App.jsx`](src/App.jsx) supplies the shared navbar, footer, scroll-to-top behavior, popup state, and AOS initialization. [`src/routes/AppRoutes.jsx`](src/routes/AppRoutes.jsx) selects the page for the current URL.

### Module Responsibilities

| Module | Responsibility |
| --- | --- |
| `src/pages/Home.jsx` | Compose hero, API products, promotional cards, banner, subscription section, and testimonials |
| `src/components/Navbar/Navbar.jsx` | Navigation, catalog search suggestions, category links, and account/cart controls |
| `src/components/Products/Products.jsx` | Render the homepage API catalog and loading/error/empty states |
| `src/pages/ProductsPage.jsx` | Apply search, category, price, sorting, and pagination controls |
| `src/components/Products/ProductCard.jsx` | Render a catalog card linking to product details |
| `src/components/Products/Sidebar.jsx` | Present category, price, and sorting controls |
| `src/pages/ProductDetails.jsx` | Resolve a product, display details, and create cart/wishlist entries |
| `src/services/products.js` | Fetch, normalize, cache, search, and identify catalog products |
| `src/context/CartContext.jsx` | Manage cart items, quantities, removal, and persistence |
| `src/context/WishlistContext.jsx` | Manage saved items and persistence |
| `src/pages/CheckoutPage.jsx` | Present billing/payment UI and the current demo checkout flow |

Presentation components receive the adapter's familiar fields rather than implementing their own API conversion. Static promotional content remains separate from the external catalog.

### Routing

| Route | Page |
| --- | --- |
| `/` | Home |
| `/products` | Catalog |
| `/product/:id` | Product details |
| `/cart` | Cart |
| `/wishlist` | Wishlist |
| `/checkout` | Checkout |
| `/success` | Order success |
| `/login` | Login |

Search and category selections can enter through query parameters on `/products`. Pagination, sort order, and price selection remain component state. No frontend authentication guards are currently applied to these routes.

## 3. Product Data Contract

The catalog source is defined in [`src/services/products.js`](src/services/products.js):

```text
https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json
```

The endpoint returns an array. `normalizeProduct()` preserves the original fields and adds aliases required by existing UI code:

| Source field | Normalized contract |
| --- | --- |
| `id` | Converted to a string |
| `name` | Retained; also exposed as `title` |
| `image` | Retained; also exposed as `img` |
| `priceCents` | Retained; `price` is calculated as `priceCents / 100` |
| `rating.stars` | Retained; also exposed as `rating.rate`, defaulting to zero |
| `rating.count` | Retained as the review count |
| `description` | Retained for details |
| `category`, `subCategory`, `keywords` | Retained for matching |

`formatPrice()` formats the normalized numeric price as dollars with two decimal places. `getProduct(id)` obtains the shared catalog and looks up the string ID; it does not call a separate details endpoint. A missing ID rejects with `Product not found.`

ProductDetails creates a smaller view model with numeric rating, review count, and description aliases. Cart and wishlist entries contain product snapshots such as `id`, `title`, `price`, and `img`; the cart also stores `qty`. These snapshots are not automatically synchronized with later catalog changes.

## 4. Fetching, Cache, and Rendering

### Request Lifecycle

```text
getProducts()
  |
  Check memory / localStorage cache
  |-- Valid and younger than 5 minutes -> Return cached products
  `-- Missing, invalid, or expired
        |
        Existing pending request?
        |-- Yes -> Share its promise
        `-- No  -> Fetch with a 15-second AbortController timeout
                    |
                    Check HTTP status and array response
                    |
                    Normalize -> Save cache -> Return products
                    |
                    Clear timeout and pending-request reference
```

The cache record contains `savedAt` and normalized `products`. Its localStorage key is `shopping-now:products:v1`. Reads check the timestamp and basic product fields. Invalid JSON, unavailable storage, and expired records are treated as cache misses. When storage writes fail, the in-memory cache remains usable.

Failed requests are logged and rejected to the calling component. Clearing the pending promise allows a later request to retry. There is no automatic retry loop, background refresh, or stale-cache fallback after expiry. An already mounted page does not refresh itself simply because five minutes have elapsed.

### UI States

The homepage and catalog page initialize their state from `getCachedProducts()` when available, avoiding a loading flash on a warm cache. During an uncached request, they display a loading status. Success replaces it with products or an empty state; failure replaces it with an error message.

Effects use an `active` flag to avoid state updates after unmount. Shared requests can continue after a component unmounts so another consumer can reuse their result. ProductDetails clears the previous selection when its route ID changes and handles lookup failures separately.

### Loading Performance

- `index.html` preconnects to the catalog/image host.
- Concurrent consumers share one catalog request.
- The homepage loads its first five product images eagerly and later images lazily.
- Catalog card images use native lazy loading and asynchronous decoding.
- Existing image containers reserve display space.
- Product content uses a 180ms opacity animation; reduced-motion preferences disable it.

These choices reduce repeated requests and initial image work. The first uncached load still depends on the external host and the user's connection.

## 5. Search and Filtering

`matchesSearch()` combines `name`, `category`, `subCategory`, and `keywords` into lowercase text, then checks the trimmed lowercase query. Navbar suggestions show up to six matches.

`matchesCategory()` supports exact category matching plus compatibility aliases for Fashion, Beauty, Home, and Electronic. Mobile, Laptop, Book, and Toy & Games use word matching against the product name, subcategory, and keywords. Missing matches produce a clean empty state.

The catalog page processes data in this order:

```text
Normalized products
  -> Search match
  -> Selected category match (any selected category)
  -> Maximum price
  -> Optional ascending/descending price sort
  -> Pagination (8 products per page)
```

These operations run in the browser. The backend has its own independent database query implementation, which is not involved in storefront filtering.

## 6. State Ownership and Persistence

| State | Owner | Persistence |
| --- | --- | --- |
| Product data | Product service and consuming components | Memory + `shopping-now:products:v1` |
| Cart | `CartContext` | `cart` in localStorage |
| Wishlist | `WishlistContext` | `wishlist` in localStorage |
| Theme | DarkMode component | `theme` in localStorage |
| Authenticated identity | Auth0 SDK | Managed by SDK configuration |
| Search/category navigation | Router and page state | URL query parameters |
| Quantity selection, pagination, sorting, popup state | Components | In memory |

Cart additions merge matching IDs and accumulate quantities. Wishlist additions avoid duplicate IDs. Context effects save their current arrays after changes. Unlike the product-cache reader, cart/wishlist initialization currently parses localStorage without a recovery guard for malformed JSON.

No Redux store, cross-device cart synchronization, or backend cart collection is implemented.

## 7. Authentication Boundaries

### Storefront

Auth0 configuration lives in `src/main.jsx`. Login and logout use the Auth0 React SDK. The social buttons launch the same hosted redirect flow. The custom email/password, signup, and password-recovery UI is not integrated; its Login handler currently logs entered values.

### Backend

The backend issues its own JWT containing `userId`, with a 30-day expiry. `protect` verifies the Bearer token and loads the MongoDB user without its password. `admin` checks for the `admin` role. Registration accepts the explicit user fields and leaves the role at its default, `user`.

Auth0 tokens are not validated by this backend. There is no identity mapping, shared session, or token exchange between the two authentication systems.

## 8. Backend Layers

[`backend/src/server.js`](backend/src/server.js) loads environment variables, initiates the MongoDB connection, configures CORS and body parsing, registers routes, and starts the HTTP listener. Development requests are logged through Morgan.

```text
HTTP request
  -> CORS / JSON and URL-encoded parsing / development logging
  -> Route selection
  -> protect, then admin checks where required
  -> Controller
  -> Mongoose model
  -> MongoDB
  -> JSON response

Unmatched route or thrown error -> Error middleware -> JSON error response
```

| Directory | Responsibility |
| --- | --- |
| `config/` | MongoDB connection |
| `routes/` | Endpoint declarations and middleware attachment |
| `middleware/` | JWT authentication, admin checks, and error responses |
| `controllers/` | User, product, and order operations |
| `models/` | Mongoose schemas and model methods |
| `utils/` | JWT generation |
| `seed/` | Sample product data and replacement seed script |

Routes are mounted at `/api/auth`, `/api/products`, and `/api/orders`, with `/api/health` for a basic response. The health endpoint does not explicitly test database readiness. Database connection failures exit the process; startup currently calls the connection function without awaiting it before listening.

Product writes require an admin. Order reads check the owner or admin, but the payment-update action only requires authentication. The error middleware returns `success: false` and a message; stack traces are omitted in production.

## 9. Database Relationships

```text
User (MongoDB ObjectId)
  `-- Order.user
        |-- Shipping address snapshot
        |-- Payment/status fields
        `-- orderItems[]
              |-- Title, image, price, quantity snapshots
              `-- Optional Product reference

Product (MongoDB ObjectId)
  `-- Catalog data, stock, brand, and rating
```

Users have unique email addresses and bcrypt password hashes. Products have a text index covering title, description, and category. Orders record item snapshots, totals, delivery/payment state, and timestamps.

External catalog IDs cannot be used directly as MongoDB product references. The seed script replaces all database products with local samples; it does not synchronize the external catalog.

## 10. Checkout Boundary

The existing frontend checkout is a demonstration. Cash on delivery shows a confirmation alert, clears the local cart, and opens `/success`; no order request is sent. The Razorpay handler also clears local state after its callback without backend persistence.

The backend supports order creation and payment-state updates independently. It currently trusts submitted totals and does not verify payment signatures. The payment update also lacks order ownership checks. Consequently, a local success screen is not evidence of a persisted or verified purchase.

Product prices display in USD, while the payment scaffold specifies INR and a placeholder key. Cart and checkout fee calculations differ. These boundaries remain unresolved in the current implementation.

## 11. Runtime and Deployment

| Concern | Current configuration |
| --- | --- |
| Frontend development | Vite, normally port 5173 |
| Frontend production output | Static files in `dist/` |
| Client routing | BrowserRouter; host must rewrite application routes to `index.html` |
| Backend process | Node.js/Express, `PORT` default 5000 |
| Database | `MONGO_URI` |
| Backend JWT signing | `JWT_SECRET` |
| Backend browser origin | `CLIENT_URL`, default `http://localhost:5173` |
| Product endpoint | Constant in `src/services/products.js` |
| Auth0 public settings | `src/main.jsx` |

Vite currently configures the React plugin without a backend proxy. The static frontend and backend are deployed independently. CORS is configured for the selected client origin with credentials enabled; it does not replace authentication or authorization.

## 12. Constraints for Future Changes

The following boundaries should be addressed when extending the system; they are not implemented features:

- Connecting the backend requires choosing a catalog source and mapping external string IDs to database identities.
- Sharing authentication requires explicit Auth0 validation or adoption of the backend login flow.
- Persisted orders require a frontend request, server-calculated totals, stock checks, and verified payment ownership/signatures.
- Changing the product contract requires updating the compatibility adapter and considering existing cart/wishlist snapshots and cache versions.
- The full-catalog download and client-side filtering suit a small catalog; a large catalog would require a different query and pagination strategy.
- Storage recovery for cart/wishlist, refresh-token behavior for backend JWTs, automated test coverage, and admin UI remain gaps.

Only the architecture documentation is introduced by this file; it does not change application behavior.
