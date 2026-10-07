# Shopping-Now ? E-commerce Storefront

A React.js + Vite shopping application with product browsing, search, category filters, product details, a persistent cart and wishlist, and a responsive light/dark interface. The repository also includes a Node.js, Express, and MongoDB backend for users, products, and orders.

The storefront currently loads its catalog from an external JSON API and uses Auth0 for hosted authentication. The included backend is a separate implementation; its authentication, catalog, and order APIs are not yet connected to the storefront.

## Application URLs

| Application | Local URL |
| --- | --- |
| React frontend | http://localhost:5173 |
| Express backend | http://localhost:5000 |
| Backend health check | http://localhost:5000/api/health |

Vite may select another port if 5173 is occupied. Use the URL printed in the terminal.

## Tech Stack

### Frontend

- React 18 + Vite
- React Router for page navigation
- React Context for cart and wishlist state
- Tailwind CSS for responsive styling and dark mode
- Native Fetch API for product requests
- Auth0 React SDK for hosted login/logout
- Framer Motion, AOS, and CSS animations
- React Slick and Slick Carousel
- React Icons and Lucide React
- Browser localStorage for saved shopping state, theme, and product cache

### Backend

- Node.js + Express
- MongoDB / MongoDB Atlas + Mongoose
- JWT authentication and bcryptjs password hashing
- CORS, Morgan, dotenv, and express-async-handler
- Nodemon for development

## Architecture

```text
User
  |
React + Vite storefront
  |-- React Router -> Home / Products / Details / Cart / Wishlist / Checkout
  |-- Product service -> External JSON catalog
  |                     -> Memory + localStorage cache (5 minutes)
  |-- React Context -> Cart + Wishlist -> localStorage
  `-- Auth0 SDK -> Hosted authentication

Included backend (not yet connected to storefront)
  Express routes -> Authentication / Admin checks -> Controllers
                                                     |
                                                  Mongoose
                                                     |
                                                  MongoDB
                                             Users / Products / Orders
```

### Product Request Flow

```text
Page opens -> Check valid product cache
  |-- Cache available -> Render saved products
  `-- Cache missing/expired -> Fetch JSON -> Normalize fields -> Cache -> Render
                                |
                                `-- Request fails -> Stop loading -> Show error
```

Concurrent catalog requests share one pending request. Requests time out after 15 seconds, and failed requests can be retried on the next load. Expired data is refreshed on the next product request; there is no background polling.

## Main Workflows

### 1. Product Browsing and Details

The homepage displays API products alongside existing promotional sections. The products page supports category selection, a price filter, price sorting, and pagination with eight products per page. Opening a card resolves its product ID against the same catalog and shows its image, description, price, rating, and review count.

### 2. Search and Categories

Navbar suggestions and product-page search match product names, categories, subcategories, and keywords without case sensitivity.

| Navigation category | Catalog matching |
| --- | --- |
| Fashion | Fashion & Apparel |
| Beauty | Beauty & Personal Care |
| Home | Home & Kitchen |
| Electronic | Electronics & Gadgets |
| Mobile | Phone/mobile terms in name, subcategory, or keywords |
| Laptop | Laptop/notebook terms in name, subcategory, or keywords |
| Book | Book terms, or an empty state when unavailable |
| Toy & Games | Toy/game terms, or an empty state when unavailable |

The filter sidebar also includes the API's Health & Fitness category. Categories without matches show **No products available**.

### 3. Cart and Wishlist

Products can be added from the details page to the cart or wishlist. The cart supports quantity changes, item removal, and a calculated summary. Wishlist items can be removed or added to the cart. Both lists persist across reloads through localStorage.

### 4. Authentication

The login page offers Auth0 redirect login and logout. The Google and Facebook buttons currently start the same Auth0 redirect flow; available identity providers depend on the Auth0 tenant configuration.

The custom email/password form, sign-up view, and forgot-password view are placeholders. They do not call the included backend. The custom Login handler currently logs its input to the console, so use the Auth0 flow rather than entering real credentials into that form.

### 5. Checkout and Order Now

Promotional **Order Now** buttons open the products page. The cart leads to checkout, which contains billing fields and payment choices. The current cash-on-delivery flow displays a success alert, clears the local cart, and navigates to the success page. It does not create a backend order.

Razorpay integration is a demo scaffold with a placeholder key. See the payment limitations below before using checkout beyond a demonstration.

## Product API Integration

Catalog endpoint:

```text
https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json
```

Integration lives in [`src/services/products.js`](src/services/products.js). No API key is required. The adapter retains original API fields and supplies aliases expected by existing components:

| API field | UI / adapter field |
| --- | --- |
| `id` | String `id`, used in detail routes |
| `name` | `name` and `title` |
| `image` | `image` and `img` |
| `priceCents` | `price = priceCents / 100` |
| `rating.stars` | `rating.stars` and `rating.rate` |
| `rating.count` | Review count |
| `description` | Product description |
| `category`, `subCategory`, `keywords` | Search and filtering |

Prices display in dollars with two decimal places, for example `4000` cents becomes `$40.00`. Product details use the catalog lookup rather than a separate single-product endpoint.

Loading improvements include a five-minute cache, connection preconnect, lazy loading for lower-page images, asynchronous image decoding, and a short fade-in animation that respects reduced-motion preferences.

## State Management

| State | Location |
| --- | --- |
| Cart items and quantities | `CartContext` + localStorage key `cart` |
| Wishlist items | `WishlistContext` + localStorage key `wishlist` |
| Authentication | Auth0 React SDK |
| Product cache | Service memory + localStorage key `shopping-now:products:v1` |
| Search, filters, sorting, pagination | Component state; search/category also use URL query parameters |
| Theme preference | localStorage key `theme` |

Redux is not used. The external catalog uses string IDs, while backend products use MongoDB ObjectIds; these are separate catalogs.

## Included Backend

### Database Models

```text
User -> has Orders
Order -> contains item snapshots and optional Product references
Product -> stores title, description, price, category, image, stock, and rating
```

User roles are `user` and `admin`. Public registration creates a regular user. Passwords are hashed before saving; protected endpoints load the user from MongoDB using a JWT Bearer token. Tokens currently expire after 30 days. There is no admin creation script or admin dashboard.

### API Endpoints

All paths below are prefixed with `/api`.

| Method | Endpoint | Access / behavior |
| --- | --- | --- |
| GET | `/health` | Public health response |
| POST | `/auth/register` | Public registration |
| POST | `/auth/login` | Public credential login; returns JWT |
| GET | `/auth/profile` | Authenticated user's profile |
| GET | `/products` | Public catalog query |
| GET | `/products/categories` | Public category list |
| GET | `/products/:id` | Public product details |
| POST | `/products` | Admin only |
| PUT | `/products/:id` | Admin only |
| DELETE | `/products/:id` | Admin only |
| POST | `/orders` | Authenticated order creation |
| GET | `/orders/my-orders` | Current user's orders |
| GET | `/orders/:id` | Order owner or admin |
| PATCH | `/orders/:id/pay` | Authenticated; currently missing ownership/payment verification |

`GET /products` accepts `search`, `category`, `minPrice`, `maxPrice`, `sort`, `page`, and `limit`. Supported sort values are `low`, `high`, and `newest`.

## Setup

### Requirements

- Node.js 20.19+ and npm
- Internet access for catalog data, images, and Auth0
- MongoDB locally or MongoDB Atlas, only when running the backend

Run the commands below from the directory containing this README and `package.json` (`shopsy-main` in this checkout).

### Frontend

```bash
npm install
npm run dev
```

The storefront can browse products without starting the local backend. No frontend `.env` file is currently required: the catalog URL is defined in `src/services/products.js`, and the Auth0 domain/client ID are configured in `src/main.jsx`.

To use your own Auth0 application, update those public client settings and configure its allowed callback URLs, logout URLs, and web origins for your frontend origin, such as `http://localhost:5173`.

### Backend (Optional)

```bash
npm run backend:install
```

Create `backend/.env` from the example if it does not already exist.

PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

macOS/Linux:

```bash
cp backend/.env.example backend/.env
```

Configure:

```dotenv
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopping-now
JWT_SECRET=replace_with_a_strong_random_secret
CLIENT_URL=http://localhost:5173
```

Start MongoDB or supply your Atlas URI, then start the backend in a separate terminal:

```bash
npm run backend:dev
```

`CLIENT_URL` must match the frontend origin. Real `.env` files are excluded by `.gitignore`.

### Seed Backend Products

```bash
npm run backend:seed
```

**This command deletes all existing products in the configured database before inserting the sample catalog.** It only affects the backend database; the storefront continues using the external JSON API.

## Scripts and Build

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Build frontend into `dist/` |
| `npm run preview` | Preview the built frontend locally |
| `npm run lint` | Run the configured ESLint checks |
| `npm run backend:install` | Install backend dependencies |
| `npm run backend:dev` | Start backend with Nodemon |
| `npm run backend:start` | Start backend with Node.js |
| `npm run backend:seed` | Replace backend sample products |

There is no `npm test` script configured. For static hosting, deploy `dist/` and configure SPA fallback to `index.html` so direct product and other route URLs work. The backend must be hosted separately if used.

## Project Structure

```text
shopsy-main/
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- seed/
|   |   |-- utils/
|   |   `-- server.js
|   |-- .env.example
|   `-- package.json
|-- public/
|-- src/
|   |-- assets/
|   |-- components/
|   |-- context/
|   |-- pages/
|   |-- routes/AppRoutes.jsx
|   |-- services/products.js
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
|-- tailwind.config.js
|-- vite.config.js
`-- README.md
```

## Frontend Routes

| Route | Page |
| --- | --- |
| `/` | Home and featured products |
| `/products` | Searchable, filterable catalog |
| `/product/:id` | Product details |
| `/cart` | Shopping cart |
| `/wishlist` | Saved products |
| `/checkout` | Checkout demo |
| `/success` | Order success screen |
| `/login` | Auth0 login and placeholder custom forms |

## Design Decisions

- **Compatibility adapter:** Existing cards and contexts consume consistent fields without changing the catalog's original data.
- **Shared requests and caching:** Navbar, catalog, and details reuse product data; a five-minute expiry limits stale catalog data.
- **Client-side catalog controls:** Search, filters, sorting, and pagination run against the downloaded JSON catalog.
- **Persistent shopping state:** Cart and wishlist work without requiring the local backend.
- **Scoped animation:** Product transitions are brief, with reduced-motion support.

## Known Limitations

- Backend APIs, Auth0 identities, and frontend cart/order state are not integrated. Frontend routes have no authentication guards.
- Catalog availability depends on the external API. Cached products can remain unchanged for up to five minutes; existing saved cart/wishlist snapshots are not migrated when the catalog changes.
- Book and Toy & Games may have no matching catalog products. Promotional cards and testimonials use local static content.
- Checkout is a demo. Billing inputs are not submitted to the backend, and cash-on-delivery orders are not persisted.
- Product prices display in dollars, but the Razorpay scaffold still specifies INR and a placeholder key. Cart and checkout also use different fee calculations. Payment configuration and totals need reconciliation before real transactions.
- Backend order totals are accepted from the client. The payment-update endpoint lacks order-ownership checks and gateway signature verification; it is not ready for production payments.
- Backend product mutations have API-level admin checks, but no admin management UI is provided.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| Products fail to load | Check internet access and the catalog request in browser Network tools; reload to retry. |
| Catalog changes are not visible | Wait for the five-minute cache expiry and reload, or remove only `shopping-now:products:v1` from localStorage. |
| A category is empty | Check whether the API contains matching names, subcategories, or keywords. |
| Auth0 redirect fails | Check the domain/client ID and allowed origins/callback/logout URLs in your Auth0 application. |
| Backend connection fails | Confirm `backend/.env`, MongoDB availability, Atlas network access, and port 5000. |
| Browser rejects backend requests | Match `CLIENT_URL` to the actual frontend origin. |
| Direct routes return 404 after deployment | Configure the static host to fall back to `index.html`. |

## Credits

- Product catalog and images: [Free Ecommerce Products API](https://github.com/kolzsticks/Free-Ecommerce-Products-Api).
- Original template's [YouTube credit](https://www.youtube.com/channel/UC1H-a1MKEFXRiFlGNLcy7gQ), retained from the previous README.
