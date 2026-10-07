const PRODUCTS_API = "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json";
const CACHE_KEY = "shopping-now:products:v1";
const CACHE_TTL = 5 * 60 * 1000;
let productCache;

export function getCachedProducts() {
  try {
    const cached = productCache || JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && Number.isFinite(cached.savedAt) &&
        Date.now() - cached.savedAt >= 0 && Date.now() - cached.savedAt < CACHE_TTL &&
        Array.isArray(cached.products) && cached.products.every((item) =>
          typeof item.id === "string" && typeof item.name === "string" &&
          typeof item.category === "string" && typeof item.image === "string" &&
          Number.isFinite(item.priceCents))) {
      productCache = cached;
      return cached.products;
    }
  } catch {
    // Storage can be disabled or contain invalid data; fetch normally instead.
  }
  productCache = undefined;
  return null;
}

// Preserve API fields and provide aliases for existing cards and contexts.
export function normalizeProduct(product) {
  return {
    ...product,
    id: String(product.id),
    title: product.name,
    img: product.image,
    price: product.priceCents / 100,
    rating: { ...product.rating, rate: product.rating?.stars ?? 0 },
  };
}

export const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

export function matchesSearch(product, query) {
  const text = [product.name, product.category, product.subCategory,
    ...(product.keywords || [])].join(" ").toLowerCase();
  return text.includes(query.trim().toLowerCase());
}

export function matchesCategory(product, category) {
  const selected = category.toLowerCase();
  const aliases = {
    fashion: "fashion & apparel",
    "women's clothing": "fashion & apparel",
    beauty: "beauty & personal care",
    jewelery: "beauty & personal care",
    home: "home & kitchen",
    electronic: "electronics & gadgets",
    electronics: "electronics & gadgets",
  };
  const terms = {
    mobile: /\b(mobile|smartphone|phone)s?\b/i,
    laptop: /\b(laptop|notebook)s?\b/i,
    book: /\bbooks?\b/i,
    "toy&game": /\b(toys?|games?)\b/i,
  };
  if (terms[selected]) {
    return terms[selected].test([product.name, product.subCategory,
      ...(product.keywords || [])].join(" "));
  }
  return product.category.toLowerCase() === (aliases[selected] || selected);
}

let productsRequest;

export function getProducts() {
  const cached = getCachedProducts();
  if (cached) return Promise.resolve(cached);
  if (!productsRequest) {
    productsRequest = (async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(PRODUCTS_API, { signal: controller.signal });
        if (!response.ok) throw new Error(`Product API returned ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid product API response");
        const products = data.map(normalizeProduct);
        productCache = { savedAt: Date.now(), products };
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(productCache));
        } catch {
          // Keep the in-memory cache when browser storage is unavailable.
        }
        return products;
      } finally {
        clearTimeout(timeout);
      }
    })().catch((error) => {
      console.error("Product API Error:", error);
      throw error;
    }).finally(() => {
      productsRequest = undefined;
    });
  }
  return productsRequest;
}

export async function getProduct(id) {
  const products = await getProducts();
  const product = products.find((item) => item.id === String(id));
  if (!product) throw new Error("Product not found.");
  return product;
}
