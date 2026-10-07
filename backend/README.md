# Shopping Now Backend

Node.js, Express, and MongoDB API for the Shopping Now ecommerce app.

## Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Make sure MongoDB is running locally, or replace `MONGO_URI` in `.env` with your MongoDB Atlas connection string.

## Seed Products

```bash
npm run seed
```

## API Routes

- `GET /api/health` - API status
- `POST /api/auth/register` - create account
- `POST /api/auth/login` - login
- `GET /api/auth/profile` - current user profile
- `GET /api/products` - list products with optional `search`, `category`, `minPrice`, `maxPrice`, `sort`, `page`, `limit`
- `GET /api/products/categories` - list product categories
- `GET /api/products/:id` - product details
- `POST /api/products` - create product, admin only
- `PUT /api/products/:id` - update product, admin only
- `DELETE /api/products/:id` - delete product, admin only
- `POST /api/orders` - create order, login required
- `GET /api/orders/my-orders` - current user's orders
- `GET /api/orders/:id` - order details
- `PATCH /api/orders/:id/pay` - mark order paid
