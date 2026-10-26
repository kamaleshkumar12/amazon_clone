import React, { useState } from 'react';
import { Star, Heart, Check, ShoppingCart } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onOpenDetails,
  isWishlisted,
  onToggleWishlist
}) {
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="amz-product-card" onClick={() => onOpenDetails(product)}>
      {/* Product Badge */}
      {product.badge && (
        <span 
          className={`amz-card-badge ${
            product.badge === "Amazon's Choice" 
              ? 'amz-badge-choice' 
              : product.badge === "Best Seller" 
              ? 'amz-badge-seller' 
              : 'amz-badge-deal'
          }`}
        >
          {product.badge === "Amazon's Choice" ? (
            <>Amazon's <span>Choice</span></>
          ) : (
            product.badge
          )}
        </span>
      )}

      {/* Wishlist Button */}
      <button 
        className={`amz-wishlist-btn ${isWishlisted ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart 
          size={18} 
          fill={isWishlisted ? '#cc0c39' : 'none'} 
          color={isWishlisted ? '#cc0c39' : '#555'} 
        />
      </button>

      {/* Image Container */}
      <div className="amz-card-image-box">
        <img 
          src={product.image} 
          alt={product.title} 
          className="amz-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>

      {/* Content */}
      <div className="amz-card-content">
        <span className="amz-card-brand">{product.brand}</span>
        
        <h3 
          className="amz-card-title" 
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Ratings */}
        <div className="amz-card-ratings">
          <div className="amz-stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.rating) ? '#de7921' : 'none'} 
                color="#de7921" 
              />
            ))}
          </div>
          <span className="amz-reviews-count">
            {product.reviewsCount.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Bought last month tag */}
        {product.boughtLastMonth && (
          <div className="amz-card-bought">
            {product.boughtLastMonth}
          </div>
        )}

        {/* Price Row */}
        <div className="amz-card-price-row">
          <span className="amz-price-symbol">₹</span>
          <span className="amz-price-main">{product.price.toLocaleString('en-IN')}</span>
          <span className="amz-discount-pct">({discountPercent}% off)</span>
        </div>

        {/* MRP strike */}
        <div className="amz-mrp-row">
          M.R.P.: <span className="amz-mrp-strike">₹{product.mrp.toLocaleString('en-IN')}</span>
        </div>

        {/* Prime & Delivery */}
        {product.prime && (
          <div className="amz-prime-badge">
            <span style={{ 
              background: '#00a8e1', 
              color: '#fff', 
              fontSize: '10px', 
              padding: '1px 5px', 
              borderRadius: '2px' 
            }}>
              ✓ prime
            </span>
            <span style={{ color: '#007185', fontSize: '12px' }}>FREE Delivery</span>
          </div>
        )}

        <div className="amz-delivery-info">
          Get it by <span className="amz-delivery-bold">{product.deliveryDate}</span>
        </div>

        {/* Add to Cart CTA */}
        <button 
          className={`amz-btn-add-cart ${isAdded ? 'added' : ''}`}
          onClick={handleAdd}
        >
          {isAdded ? (
            <>
              <Check size={16} />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart size={15} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
