import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SubNav from './components/SubNav';
import CategoryDrawer from './components/CategoryDrawer';
import HeroBanner from './components/HeroBanner';
import DealsHighlight from './components/DealsHighlight';
import FiltersSidebar from './components/FiltersSidebar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrdersModal from './components/OrdersModal';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';

export default function App() {
  // Navigation & Search State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [dealsOnly, setDealsOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [_mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Delivery Location
  const [location, setLocation] = useState({ city: 'Mumbai', pincode: '400001' });

  // Facet Filters State
  const [primeOnly, setPrimeOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 160000]);
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState([
    { ...PRODUCTS[0], quantity: 1 } // initial item in cart for quick testing
  ]);
  const [wishlist, setWishlist] = useState(['amz-prod-102']);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Orders State
  const [orders, setOrders] = useState([]);

  // Modals & Drawers
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  // Toast Notification
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Available brands in the current category
  const availableBrands = useMemo(() => {
    const list = selectedCategory === 'All' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === selectedCategory);
    return Array.from(new Set(list.map(p => p.brand)));
  }, [selectedCategory]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Deals only filter
      if (dealsOnly && !item.badge) {
        return false;
      }

      // Keyword search
      if (submittedSearch) {
        const query = submittedSearch.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesDesc && !matchesCat) {
          return false;
        }
      }

      // Prime filter
      if (primeOnly && !item.prime) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && item.rating < minRating) {
        return false;
      }

      // Price filter
      if (item.price < priceRange[0] || item.price > priceRange[1]) {
        return false;
      }

      // Discount filter
      if (minDiscount > 0) {
        const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
        if (disc < minDiscount) return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) {
        return false;
      }

      // In stock filter
      if (!inStockOnly && !item.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // featured default
    });
  }, [
    selectedCategory,
    dealsOnly,
    submittedSearch,
    primeOnly,
    minRating,
    priceRange,
    minDiscount,
    selectedBrands,
    inStockOnly,
    sortBy
  ]);

  // Handlers
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setDealsOnly(false);
    setSelectedBrands([]);
  };

  const handleShowDealsOnly = () => {
    setDealsOnly(true);
    setSelectedCategory('All');
  };

  const handleSearchSubmit = () => {
    setSubmittedSearch(searchQuery);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSubmittedSearch('');
    setDealsOnly(false);
    setPrimeOnly(false);
    setMinRating(0);
    setPriceRange([0, 160000]);
    setMinDiscount(0);
    setSelectedBrands([]);
    setInStockOnly(false);
    setSortBy('featured');
    showToast('Filters reset to default');
  };

  // Cart operations
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.title.slice(0, 30)}..." to Cart!`);
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQty } : item
    ));
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart');
  };

  const handleBuyNow = (product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setSelectedProductDetails(null);
    setIsCheckoutOpen(true);
  };

  const handleApplyCoupon = (code, amount) => {
    setDiscountCode(code);
    setDiscountAmount(amount);
    showToast(`Coupon ${code} applied successfully!`);
  };

  const handleOrderSuccess = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setDiscountCode('');
    setDiscountAmount(0);
    showToast('Congratulations! Order placed successfully.');
  };

  const handleToggleWishlist = (product) => {
    if (wishlist.includes(product.id)) {
      setWishlist(prev => prev.filter(id => id !== product.id));
      showToast('Removed from Wishlist');
    } else {
      setWishlist(prev => [...prev, product.id]);
      showToast('Saved to your Wishlist!');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="amz-app">
      {/* 1. Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => {
          setSelectedCategory('All');
          showToast(`You have ${wishlist.length} items in your Wishlist`);
        }}
        location={location}
        onChangeLocation={(city, pincode) => {
          setLocation({ city, pincode });
          showToast(`Delivery location updated to ${city} ${pincode}`);
        }}
      />

      {/* 2. Sub-Navigation */}
      <SubNav
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onShowDealsOnly={handleShowDealsOnly}
        dealsOnly={dealsOnly}
      />

      {/* 3. Hero Carousel (Shown when no search query and category is All) */}
      {!submittedSearch && selectedCategory === 'All' && !dealsOnly && (
        <>
          <HeroBanner onSelectCategory={handleSelectCategory} />
          <DealsHighlight onSelectCategory={handleSelectCategory} />
        </>
      )}

      {/* 4. Main Product Section */}
      <main className="amz-main-container">
        <div className="amz-layout">
          {/* Sidebar Filters */}
          <FiltersSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            primeOnly={primeOnly}
            onTogglePrime={() => setPrimeOnly(!primeOnly)}
            minRating={minRating}
            onSelectRating={setMinRating}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            minDiscount={minDiscount}
            onSelectDiscount={setMinDiscount}
            selectedBrands={selectedBrands}
            onToggleBrand={(brand) => {
              setSelectedBrands(prev => 
                prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
              );
            }}
            availableBrands={availableBrands}
            inStockOnly={inStockOnly}
            onToggleInStock={() => setInStockOnly(!inStockOnly)}
            onResetFilters={handleResetFilters}
          />

          {/* Product Listings & Sort Header */}
          <section className="amz-product-section">
            {/* Top Results Bar */}
            <div className="amz-results-bar">
              <div className="amz-results-count">
                Showing <strong>1-{filteredProducts.length}</strong> of <strong>{filteredProducts.length}</strong> results
                {submittedSearch && <> for <strong style={{ color: '#c45500' }}>"{submittedSearch}"</strong></>}
                {selectedCategory !== 'All' && <> in <strong>{selectedCategory}</strong></>}
                {dealsOnly && <span style={{ color: '#cc0c39', fontWeight: '700', marginLeft: '6px' }}>(Today's Lightning Deals)</span>}
              </div>

              <div className="amz-results-controls">
                {/* Mobile filter button */}
                <button 
                  className="amz-clear-btn"
                  style={{ display: 'none', alignItems: 'center', gap: '4px', '@media (max-width: 992px)': { display: 'flex' } }}
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <SlidersHorizontal size={14} /> Filter
                </button>

                {/* Sort selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', color: '#565959' }}>Sort by:</span>
                  <select 
                    className="amz-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="amz-view-toggle">
                  <button 
                    className={`amz-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button 
                    className={`amz-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div style={{
                background: '#fff',
                padding: '60px 20px',
                textAlign: 'center',
                borderRadius: '4px',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                  No matching products found
                </h3>
                <p style={{ color: '#565959', fontSize: '14px', marginBottom: '20px' }}>
                  Try adjusting your filter settings or search terms.
                </p>
                <button 
                  className="amz-btn-checkout"
                  style={{ width: 'auto', padding: '10px 28px', display: 'inline-block' }}
                  onClick={handleResetFilters}
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className={`amz-product-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onAddToCart={handleAddToCart}
                    onOpenDetails={setSelectedProductDetails}
                    isWishlisted={wishlist.includes(prod.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* 6. Drawers & Modals */}
      <CategoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onShowDealsOnly={handleShowDealsOnly}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        discountCode={discountCode}
        onApplyCoupon={handleApplyCoupon}
        discountAmount={discountAmount}
      />

      <ProductDetailModal
        product={selectedProductDetails}
        onClose={() => setSelectedProductDetails(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProductDetails ? wishlist.includes(selectedProductDetails.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={discountAmount}
        location={location}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="amz-toast">
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
