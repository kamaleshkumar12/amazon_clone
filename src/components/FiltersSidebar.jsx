import React from 'react';
import { Star, Check, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function FiltersSidebar({
  selectedCategory,
  onSelectCategory,
  primeOnly,
  onTogglePrime,
  minRating,
  onSelectRating,
  priceRange,
  onPriceChange,
  minDiscount,
  onSelectDiscount,
  selectedBrands,
  onToggleBrand,
  availableBrands,
  inStockOnly,
  onToggleInStock,
  onResetFilters
}) {
  return (
    <aside className="amz-sidebar">
      <div className="amz-filter-heading">
        <span className="amz-filter-title">Filters</span>
        <button 
          className="amz-clear-btn" 
          onClick={onResetFilters}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <RotateCcw size={12} />
          Clear all
        </button>
      </div>

      {/* Prime Delivery Filter */}
      <div className="amz-filter-group">
        <div className="amz-filter-group-title">Amazon Prime</div>
        <label className="amz-filter-option">
          <input 
            type="checkbox"
            checked={primeOnly}
            onChange={onTogglePrime}
          />
          <span style={{ 
            color: '#007185', 
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            <span style={{ 
              background: '#00a8e1', 
              color: '#fff', 
              fontSize: '10px', 
              padding: '1px 5px', 
              borderRadius: '3px' 
            }}>
              ✓ prime
            </span>
            Eligible for Free Delivery
          </span>
        </label>
      </div>

      {/* Department / Category */}
      <div className="amz-filter-group">
        <div className="amz-filter-group-title">Department</div>
        {CATEGORIES.map((cat) => (
          <label key={cat} className="amz-filter-option">
            <input 
              type="radio"
              name="cat-filter"
              checked={selectedCategory === cat}
              onChange={() => onSelectCategory(cat)}
            />
            <span style={{ fontWeight: selectedCategory === cat ? '700' : '400' }}>
              {cat === 'All' ? 'All Departments' : cat}
            </span>
          </label>
        ))}
      </div>

      {/* Customer Reviews */}
      <div className="amz-filter-group">
        <div className="amz-filter-group-title">Customer Reviews</div>
        <div className="amz-stars-list">
          {[4, 3, 2, 1].map((stars) => (
            <div 
              key={stars}
              className={`amz-star-filter-item ${minRating === stars ? 'active' : ''}`}
              onClick={() => onSelectRating(minRating === stars ? 0 : stars)}
            >
              <div style={{ display: 'flex', color: '#de7921' }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < stars ? '#de7921' : 'none'} 
                    color="#de7921" 
                  />
                ))}
              </div>
              <span>& Up</span>
              {minRating === stars && <Check size={14} color="#de7921" />}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="amz-filter-group">
        <div className="amz-filter-group-title">Price (₹)</div>
        <input 
          type="range"
          min="0"
          max="160000"
          step="1000"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          style={{ width: '100%', accentColor: '#e77600' }}
        />
        <div className="amz-price-inputs">
          <input 
            type="number" 
            className="amz-price-box"
            value={priceRange[0]}
            onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
            placeholder="Min ₹"
          />
          <span style={{ color: '#888' }}>-</span>
          <input 
            type="number" 
            className="amz-price-box"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            placeholder="Max ₹"
          />
        </div>
        <div style={{ fontSize: '11px', color: '#565959', marginTop: '4px' }}>
          Up to ₹{priceRange[1].toLocaleString('en-IN')}
        </div>
      </div>

      {/* Discount */}
      <div className="amz-filter-group">
        <div className="amz-filter-group-title">Discount</div>
        {[50, 30, 20, 10].map((disc) => (
          <label key={disc} className="amz-filter-option">
            <input 
              type="radio"
              name="disc-filter"
              checked={minDiscount === disc}
              onChange={() => onSelectDiscount(minDiscount === disc ? 0 : disc)}
            />
            <span>{disc}% Off or more</span>
          </label>
        ))}
      </div>

      {/* Brands */}
      {availableBrands.length > 0 && (
        <div className="amz-filter-group">
          <div className="amz-filter-group-title">Brands</div>
          {availableBrands.map((brand) => (
            <label key={brand} className="amz-filter-option">
              <input 
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onToggleBrand(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      )}

      {/* In Stock Only */}
      <div className="amz-filter-group" style={{ marginBottom: '10px' }}>
        <div className="amz-filter-group-title">Availability</div>
        <label className="amz-filter-option">
          <input 
            type="checkbox"
            checked={inStockOnly}
            onChange={onToggleInStock}
          />
          <span>Include Out of Stock</span>
        </label>
      </div>
    </aside>
  );
}
