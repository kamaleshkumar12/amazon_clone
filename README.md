# 🛒 Amazon India Clone

A full-featured Amazon.in UI clone built with **React + Vite**, featuring product browsing, cart, checkout, wishlist, orders, and more.


---

## ✨ Features

- 🏠 Hero banner carousel with auto-slide
- 🔍 Search with auto-suggestions
- 🗂️ Category filtering & sidebar filters (price, rating, brand, discount)
- 🛒 Shopping cart with quantity controls & coupon codes
- 💳 Multi-step checkout with confetti on order success
- 📦 Orders history with tracking
- ❤️ Wishlist toggle
- 📍 Delivery location picker
- 📱 Responsive design

---

## 🚀 Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or above)
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/kamaleshkumar12/amazon_clone.git

# 2. Go into the project folder
cd amazon_clone

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Then open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 19 | UI Framework |
| Vite 8 | Build tool & dev server |
| Lucide React | Icons |
| Canvas Confetti | Order success animation |
| Vanilla CSS | Styling |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Top nav with search, cart, wishlist
│   ├── SubNav.jsx          # Category navigation bar
│   ├── HeroBanner.jsx      # Auto-sliding hero carousel
│   ├── DealsHighlight.jsx  # Featured deal cards
│   ├── FiltersSidebar.jsx  # Left sidebar filters
│   ├── ProductCard.jsx     # Individual product card
│   ├── ProductDetailModal.jsx  # Product detail popup
│   ├── CartDrawer.jsx      # Slide-out cart
│   ├── CheckoutModal.jsx   # Multi-step checkout
│   ├── OrdersModal.jsx     # Orders history
│   ├── CategoryDrawer.jsx  # Mobile nav drawer
│   └── Footer.jsx
├── data/
│   └── products.js         # Product catalog data
├── App.jsx                 # Root component & state
└── index.css               # Global styles
```
