import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  ShoppingCart, 
  Menu, 
  ChevronDown, 
  X,
  Package,
  Heart
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Header({
  cartCount,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenDrawer,
  onOpenOrders,
  wishlistCount,
  onOpenWishlist,
  location,
  onChangeLocation
}) {
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [newPincode, setNewPincode] = useState('');
  const [newCity, setNewCity] = useState('');
  const [cartBump, setCartBump] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const prevCount = useRef(cartCount);

  // Trigger animation when cart count increases
  useEffect(() => {
    if (cartCount > prevCount.current) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 350);
      return () => clearTimeout(timer);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (newCity.trim() || newPincode.trim()) {
      onChangeLocation(newCity.trim() || 'Mumbai', newPincode.trim() || '400001');
      setShowLocationModal(false);
    }
  };

  return (
    <header className="amz-header">
      <div className="amz-nav-belt">
        {/* Mobile Menu Icon */}
        <button 
          className="amz-subnav-btn"
          onClick={onOpenDrawer}
          aria-label="Open navigation menu"
          style={{ display: 'none', '@media (max-width: 768px)': { display: 'flex' } }}
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <a href="#" className="amz-logo-link" onClick={(e) => { e.preventDefault(); onSelectCategory('All'); onSearchChange(''); }}>
          <div className="amz-brand">
            amazon<span className="amz-brand-in">.in</span>
            <div className="amz-brand-smile" />
          </div>
        </a>

        {/* Deliver-to Location */}
        <div 
          className="amz-nav-location" 
          onClick={() => setShowLocationModal(true)}
          title="Click to change delivery location"
        >
          <MapPin size={18} className="amz-loc-icon" />
          <div className="amz-loc-text">
            <span className="amz-loc-sub">Delivering to {location.city} {location.pincode}</span>
            <span className="amz-loc-main">Update location</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="amz-search-wrapper">
          {/* Category Dropdown */}
          <button 
            type="button" 
            className="amz-search-cat-btn"
            onClick={() => setShowCatMenu(!showCatMenu)}
          >
            <span>{selectedCategory}</span>
            <ChevronDown size={14} />
          </button>

          {showCatMenu && (
            <div 
              style={{
                position: 'absolute',
                top: '42px',
                left: 0,
                background: '#fff',
                borderRadius: '4px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                zIndex: 200,
                width: '180px',
                border: '1px solid #ddd'
              }}
            >
              {CATEGORIES.map((cat) => (
                <div
                  key={cat}
                  style={{
                    padding: '8px 12px',
                    fontSize: '13px',
                    color: '#111',
                    cursor: 'pointer',
                    background: selectedCategory === cat ? '#f3f4f6' : '#fff',
                    fontWeight: selectedCategory === cat ? '700' : '500'
                  }}
                  onClick={() => {
                    onSelectCategory(cat);
                    setShowCatMenu(false);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}

          {/* Search Input */}
          <input 
            type="text"
            className="amz-search-input"
            placeholder="Search Amazon.in"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearchSubmit();
              }
            }}
          />

          {searchQuery && (
            <button 
              type="button" 
              className="amz-search-clear" 
              onClick={() => onSearchChange('')}
              aria-label="Clear search text"
            >
              <X size={16} />
            </button>
          )}

          {/* Search Submit */}
          <button 
            type="button" 
            className="amz-search-submit" 
            onClick={onSearchSubmit}
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          {/* Auto-suggestions when typing */}
          {isFocused && searchQuery.length > 1 && (
            <div className="amz-search-suggestions">
              {['iphone 16 pro', 'sony headphones', 'macbook air m3', 'air fryer', 'samsung s24 ultra', 'kindle paperwhite']
                .filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((term) => (
                  <div 
                    key={term}
                    className="amz-suggest-item"
                    onMouseDown={() => {
                      onSearchChange(term);
                      onSearchSubmit();
                    }}
                  >
                    <Search size={14} color="#888" />
                    <span>{term}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Right Nav Actions */}
        <div className="amz-nav-actions">
          {/* Language selector */}
          <div className="amz-nav-item" title="Language: English (India)">
            <div className="amz-lang-flag">
              <span style={{ fontSize: '15px' }}>🇮🇳</span>
              <span>EN</span>
              <ChevronDown size={11} />
            </div>
          </div>

          {/* Wishlist */}
          <div className="amz-nav-item" onClick={onOpenWishlist} title="Your Wishlist">
            <span className="amz-nav-item-top">Your</span>
            <span className="amz-nav-item-bottom">
              <Heart size={14} color={wishlistCount > 0 ? '#cc0c39' : '#fff'} fill={wishlistCount > 0 ? '#cc0c39' : 'none'} />
              Wishlist ({wishlistCount})
            </span>
          </div>

          {/* Orders */}
          <div className="amz-nav-item" onClick={onOpenOrders} title="Returns & Orders">
            <span className="amz-nav-item-top">Returns</span>
            <span className="amz-nav-item-bottom">
              <Package size={14} />
              & Orders
            </span>
          </div>

          {/* Cart */}
          <button 
            className="amz-cart-btn" 
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
          >
            <div className="amz-cart-icon-wrapper">
              <ShoppingCart size={28} />
              <span className={`amz-cart-count ${cartBump ? 'bump' : ''}`}>
                {cartCount}
              </span>
            </div>
            <span className="amz-cart-text">Cart</span>
          </button>
        </div>
      </div>

      {/* Change Location Modal */}
      {showLocationModal && (
        <div className="amz-modal-backdrop" onClick={() => setShowLocationModal(false)}>
          <div className="amz-checkout-modal" style={{ maxWidth: '420px', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Choose your location</h3>
              <button onClick={() => setShowLocationModal(false)}><X size={20} /></button>
            </div>
            <p style={{ fontSize: '13px', color: '#565959', marginBottom: '16px' }}>
              Select a delivery location to see product availability and delivery options for your area.
            </p>
            <form onSubmit={handleLocationSubmit}>
              <div className="amz-form-group">
                <label className="amz-form-label">City</label>
                <input 
                  type="text" 
                  className="amz-form-input" 
                  placeholder="e.g. Mumbai, Bengaluru, Delhi"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
              </div>
              <div className="amz-form-group">
                <label className="amz-form-label">Pincode</label>
                <input 
                  type="text" 
                  className="amz-form-input" 
                  placeholder="e.g. 400001"
                  value={newPincode}
                  onChange={(e) => setNewPincode(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="amz-btn-checkout" 
                style={{ marginTop: '10px' }}
              >
                Apply Location
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
