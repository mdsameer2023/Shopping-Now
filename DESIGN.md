# Shopping-Now Design Guide

This document describes the existing storefront's visual design and interaction patterns. It uses [README.md](README.md) as the product reference and the React components as the implementation source. For system structure and data flow, see [ARCHITECTURE.md](ARCHITECTURE.md).

## 1. Product Experience

Shopping-Now supports browsing products, searching the catalog, opening product details, saving items to a wishlist, managing a cart, and entering a checkout demonstration.

The current visual language combines warm orange purchase actions, a pink navigation area, large promotional imagery, white product surfaces, rounded controls, and colorful interaction accents. Dark mode changes selected backgrounds and foregrounds through Tailwind's `dark:` variants.

This is a description of the implemented UI. Unfinished interactions and visual inconsistencies are identified separately below.

## 2. Design Sources

| Source | Defines |
| --- | --- |
| [tailwind.config.js](tailwind.config.js) | Brand colors, container padding, and class-based dark mode |
| [src/index.css](src/index.css) | Shared input styling, smooth scrolling, and product entrance animation |
| [src/App.jsx](src/App.jsx) | Application surface, shared shell, and AOS defaults |
| `src/components/` | Navigation, product cards, promotional sections, and footer |
| `src/pages/` | Catalog, details, cart, wishlist, checkout, and login layouts |
| [src/services/products.js](src/services/products.js) | Product naming, price formatting, search, and category matching |
| `src/assets/` | Logo, promotional images, theme switches, and background patterns |

Most styling is expressed directly through Tailwind utilities. There is no separate component-library package or complete semantic token system.

## 3. Color System

### Brand Tokens

| Token | Value | Current use |
| --- | --- | --- |
| `primary` | `#fea928` | Prices, purchase actions, highlights, input focus ring |
| `secondary` | `#ed8900` | Orange gradient endpoint |
| `from-primary to-secondary` | Primary-to-secondary gradient | Promotional Order Now buttons |

### Supporting Colors

| Utility family | Current use |
| --- | --- |
| `bg-white`, `bg-gray-50`, `bg-gray-100` | Main surfaces, checkout background, hero and image panels |
| `gray-400`, `gray-500`, `gray-600` text | Descriptions and secondary information |
| `bg-red-400/40` | Light-mode navbar background |
| `border-blue-500` | Search field, login outline, catalog cards |
| `yellow-400`, `yellow-500` | Rating stars |
| `red-500` | Wishlist icon, removal actions, and some empty-state text |
| `green-500`, `green-600` | Stock/success messaging and promotional accents |
| `purple-600` | Auth0 action and selected pagination button |
| Yellow-to-pink / yellow-to-orange gradients | Cart, wishlist, and checkout actions |

These supporting colors are component utilities, not additional brand tokens. The current interface uses different accent colors for different actions.

### Dark Mode

Dark mode is enabled by adding `dark` to the root HTML element. The selected theme is saved under the `theme` localStorage key; the initial fallback is light mode.

- The application shell uses `dark:bg-gray-900` and `dark:text-white`.
- Several promotional cards use `dark:bg-gray-800`.
- The navbar uses a cyan-tinted dark background and a red search border.
- The hero includes a muted red background and pink text in dark mode.
- Product imagery can retain a white background to preserve image visibility.

Dark variants are not applied consistently to every page. White form panels and some inherited text colors still need a separate contrast review.

## 4. Typography

No custom font family or web-font import is defined in the inspected theme and global stylesheet. Text uses Tailwind's default sans-serif stack and the browser's available fonts.

| Role | Existing styling |
| --- | --- |
| Hero headline | `text-5xl sm:text-6xl lg:text-7xl font-bold` |
| Homepage section title | Usually `text-3xl font-bold` |
| Page title | Commonly `text-2xl sm:text-3xl font-bold` |
| Product detail title | `text-xl md:text-2xl font-bold` |
| Promotional card title | `text-xl font-bold` |
| Homepage product title | `text-sm font-semibold line-clamp-1` |
| Supporting text | `text-sm` or `text-xs`, commonly gray |
| Price | `font-bold text-primary` |

Homepage product names are truncated to one line, while promotional descriptions use two-line clamping. Catalog card titles are not clamped in the same way. Product names and descriptions should come from the API; promotional headlines remain static content.

## 5. Spacing, Shapes, and Surfaces

- Tailwind containers are centered, with `1rem` default horizontal padding and `3rem` padding from `sm` upward.
- Page wrappers commonly use `p-4` with larger padding at wider breakpoints.
- Homepage sections use generous vertical spacing, including `space-y-10`.
- Search inputs and primary promotional actions use pill shapes through `rounded-full`.
- Catalog cards and image panels use `rounded-md` or `rounded-lg`.
- Promotional cards use `rounded-2xl`, pronounced shadows, and overlapping imagery.
- Checkout panels use white surfaces, rounded corners, and subtle shadows.
- Borders, shadows, and whitespace establish grouping; there is no global elevation scale.

## 6. Navigation and Page Structure

### Shared Shell

The navbar contains the Shopping-Now logo, a prominent search field, wishlist/cart controls, location action, login control, and theme switch. A category row provides For You, Fashion, Mobile, Beauty, Home, Electronic, Laptop, Book, and Toy & Games links.

The navbar wrapper declares `sticky top-0 z-50`. Its behavior should be evaluated in the actual parent layout rather than assumed from that class alone. Search suggestions appear below the input in a white, scrollable dropdown. A timed login reminder appears near the lower-right corner with Login Now and Close actions.

The footer uses a photographic background with a dark overlay, grouped link columns, brand copy, social icons, contact text, and copyright information.

### Homepage Order

```text
Shared navbar and category navigation
  -> Hero carousel
  -> API product grid
  -> Best Products promotional cards
  -> Sale banner
  -> Subscription input section
  -> Testimonials
Shared footer
```

### Other Pages

| Page | Main composition |
| --- | --- |
| Products | Filter sidebar, search input, product grid, pagination |
| Product details | Breadcrumb, image panel, product information, quantity/actions, information tabs |
| Cart | Breadcrumb, item rows, quantity/removal controls, order summary |
| Wishlist | Breadcrumb, saved item rows, Add to Cart and Remove actions |
| Checkout | Billing/payment panel and order summary |
| Login | Gradient header, overlapping form card, Auth0/social actions |
| Success | Centered success message and Continue Shopping action |

## 7. Product Components

### Homepage API Cards

The homepage displays two columns by default, three at `sm`, four at `md`, and five at `lg`. Each card is a link to its detail route and contains:

1. A contained product image in a white, rounded panel.
2. Product name and category.
3. A yellow star with the numeric API rating.
4. A bold orange price.

Images use a `150px` by `220px` display area. Hover scales the inner card to 105%. The first five images load eagerly; subsequent images load lazily, with asynchronous decoding.

### Catalog Cards

Catalog cards have a two-pixel blue border, rounded corners, and padding. Their image wrapper is currently `230px` wide and `280px` high, while the image is contained at `w-40`. The title and price sit below the image. The entire card links to details, with a hover scale effect.

This card variant does not currently display ratings or category text. Its fixed-width image wrapper is a known narrow-screen constraint.

### Promotional Cards

Best Products cards use local shirt images, static names/descriptions, decorative stars, and orange Order Now buttons. Images extend above the card surface. Hover lifts the card, enlarges the image, and changes its background. These cards are promotional content rather than API-backed product records; Order Now opens the catalog.

### Product Details

The layout becomes two columns at `md`. The product image sits in a gray panel that grows from `300px` to `450px` high. Information includes the product name, stars, review count, price, stock label, description, quantity control, and shopping actions.

The rating display uses whole-star characters derived by flooring the numeric rating. The description tab uses API content; the additional information and shipping copy are static. Stock is currently presented as available by the view model rather than verified inventory.

## 8. Data Display and Feedback

| State or content | Existing presentation |
| --- | --- |
| Price | Dollars with two decimals, e.g. `$40.00` from `4000` cents |
| Product loading | Centered `Loading...`; homepage/catalog use `role="status"` and motion-safe pulse |
| Product request failure | Inline message asking the user to refresh |
| No catalog matches | `No products available` |
| Empty cart/wishlist | Page-specific empty text |
| Selected page | Filled purple pagination button |
| Unavailable pagination direction | Disabled previous/next button |
| Wishlist/cart count | Small badge near the corresponding control |

There is no skeleton-card loading design or dedicated inline retry button. Cached products can render immediately; the short entrance animation does not delay the request. Product pages distinguish loading, errors, and empty results.

Names, images, categories, descriptions, and ratings use the external catalog through the compatibility adapter. API IDs must remain intact when constructing detail links and shopping actions.

## 9. Search, Forms, and Actions

Navbar search supports case-insensitive name, category, subcategory, and keyword matching. Arrow keys move through suggestions, and Enter opens the selected product or the search results page. The catalog also has its own search input and category checkboxes.

The shared `.input` class provides a border, padding, rounded corners, full width, and an orange focus ring. Checkout billing fields use this class; many other forms style inputs independently. Login inputs use green/red borders, and the navbar search uses a blue outline.

Purchase and browsing actions are visually prominent through filled colors, gradients, and pill shapes. Remove actions use red text or red outlines. Wishlist actions include a heart icon.

The order popup component defines a dimmed, blurred overlay and centered form, but current promotional Order Now buttons navigate to the catalog. The subscription section contains an email input without a connected submission flow. Custom login/signup/recovery forms and checkout remain partially implemented as described in the README.

## 10. Responsive Behavior

The project uses Tailwind's default responsive prefixes; no custom screen sizes are declared.

| Prefix | Minimum viewport width |
| --- | --- |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

| Area | Narrow layout | Wider layout |
| --- | --- | --- |
| Navbar | Wrapped controls, hamburger, horizontally scrollable categories | Expanded category row; search gets half-width at `md` |
| Hero | One column, image before text | Two columns from `sm` |
| Homepage products | Two columns | Three/four/five columns at `sm`/`md`/`lg` |
| Promotional cards | One column | Two at `sm`, three at `md` |
| Catalog | Stacked filters and two product columns | Sidebar at `md`; three columns at `md`, four at `lg` |
| Details | Stacked image and information | Two columns at `md` |
| Cart | Stacked content | Three-column grid at `md`, items spanning two columns |
| Wishlist rows | Stacked actions/content | Horizontal rows from `sm` |
| Checkout | Stacked panels | Three-column grid at `md` with a sticky summary |
| Footer | One column | Two at `sm`, four at `md` |

Responsive utilities are implemented, but this document does not certify every viewport as visually tested. Fixed catalog-card widths can overflow narrow grid columns and require particular attention during UI review.

## 11. Motion and Interaction

| Interaction | Implementation |
| --- | --- |
| Product entrance | 180ms opacity fade, `ease-out` |
| Loading text | Tailwind pulse only when motion is allowed |
| Product/card hover | Commonly `scale-105` with transitions |
| Promotional hover | Upward movement, stronger shadow, image scaling |
| Section reveals | AOS; application default duration 700ms, once per element |
| Hero carousel | 800ms transition, 4000ms autoplay interval |
| Details tabs | Framer Motion opacity transitions |
| Theme switch images | 300ms opacity transition |
| Page scrolling | Global smooth-scroll CSS |

Reduced-motion handling explicitly covers the product entrance animation and loading pulse. It is not a global guarantee for AOS, the carousel, tab animation, hover transforms, or smooth scrolling. The hero has no visible arrow/dot controls and pauses on focus, but not on hover.

## 12. Accessibility and Current Gaps

Existing support includes semantic links for API cards, product-image alt text in the homepage/catalog, a loading status role, native checkboxes/number inputs, and disabled pagination controls.

Areas that still need review include:

- Accessible names and keyboard behavior for icon-only or clickable non-button controls, including the theme switch and location action.
- Persistent form labels; several fields currently rely on placeholders.
- Focus management, Escape handling, and dialog semantics for popup UI.
- Combobox/listbox semantics and active-option announcements for search suggestions.
- Alt text on product details and other images that currently omit meaningful alternatives.
- Color contrast across orange prices, colored backgrounds, and partially themed dark-mode panels.
- Motion preferences across all animation libraries and the carousel.
- Nested button/link patterns and clickable text used as controls.

No accessibility conformance claim is made by this document.

## 13. Maintenance Guidelines

When extending the existing UI:

- Reuse the declared primary/secondary tokens and nearby component patterns.
- Keep API field adaptation and currency formatting in the product service.
- Preserve product IDs, card navigation, shopping state, and search/category behavior when changing presentation.
- Keep loading/error/empty states distinct and visible.
- Prefer brief animations that do not postpone useful content, with reduced-motion alternatives.
- Review both light and dark surfaces and small-screen overflow before accepting visual changes.
- Treat promotional text, static ratings, stock labels, and checkout success as presentation until backed by verified application data.

Additional known content gaps include footer links that point to placeholder destinations, a Contact route that is not registered, and checkout currency/fee inconsistencies documented in the README. They are recorded here as existing limitations, not implemented fixes.
