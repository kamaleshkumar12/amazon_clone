import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ShoppingCart, 
  Zap,
  Heart
} from 'lucide-react';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) {
  const [qty, setQty] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Reset local state when the displayed product changes.
  // eslint-disable-next-line react/set-state-in-effect -- intentional: reset on product change
  useEffect(() => {
    setQty(1);
    setAddedFeedback(false);
  }, [product]);

  if (!product) return null;

  const discountAmount = product.mrp - product.price;
  const discountPercent = Math.round((discountAmount / product.mrp) * 100);

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, qty);
  };

  return (
    <div className="amz-modal-backdrop" onClick={onClose}>
      <div 
        className="amz-detail-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="amz-modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Column: Image and Warranty Badges */}
        <div className="amz-detail-gallery">
          <div className="amz-detail-main-img-box">
            <img 
              src={product.image} 
              alt={product.title} 
              className="amz-detail-main-img" 
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
            <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '4px', fontSize: '11px', color: '#565959' }}>
              <Truck size={20} color="#007185" style={{ margin: '0 auto 4px auto' }} />
              <div>Free Prime Delivery</div>
            </div>
            <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '4px', fontSize: '11px', color: '#565959' }}>
              <RotateCcw size={20} color="#007185" style={{ margin: '0 auto 4px auto' }} />
              <div>7 Days Replacement</div>
            </div>
            <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '4px', fontSize: '11px', color: '#565959' }}>
              <ShieldCheck size={20} color="#007185" style={{ margin: '0 auto 4px auto' }} />
              <div>1 Year Warranty</div>
            </div>
          </div>
        </div>

        {/* Right Column: Information, Specs, Buy Box */}
        <div className="amz-detail-info">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ textTransform: 'uppercase', color: '#007185', fontWeight: '700', fontSize: '12px' }}>
              Brand: {product.brand}
            </span>
            <button 
              onClick={() => onToggleWishlist(product)}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isWishlisted ? '#cc0c39' : '#555', fontSize: '13px' }}
            >
              <Heart size={16} fill={isWishlisted ? '#cc0c39' : 'none'} />
              {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          <h2 className="amz-detail-title">{product.title}</h2>

          {/* Ratings */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', color: '#de7921' }}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < Math.floor(product.rating) ? '#de7921' : 'none'} 
                  color="#de7921" 
                />
              ))}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f1111' }}>
              {product.rating} out of 5
            </span>
            <span style={{ color: '#007185', fontSize: '13px' }}>
              | {product.reviewsCount.toLocaleString('en-IN')} global ratings
            </span>
          </div>

          <div className="amz-detail-divider" />

          {/* Price Box */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ color: '#cc0c39', fontSize: '24px', fontWeight: '300' }}>
                -{discountPercent}%
              </span>
              <span style={{ fontSize: '18px', verticalAlign: 'super', fontWeight: '500' }}>₹</span>
              <span style={{ fontSize: '32px', fontWeight: '800', color: '#0f1111' }}>
                {product.price.toLocaleString('en-IN')}
              </span>
            </div>
            <div style={{ fontSize: '13px', color: '#565959', marginTop: '4px' }}>
              M.R.P.: <span style={{ textDecoration: 'line-through' }}>₹{product.mrp.toLocaleString('en-IN')}</span>
              <span style={{ color: '#007600', marginLeft: '8px', fontWeight: '600' }}>
                You Save: ₹{discountAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#565959', marginTop: '2px' }}>
              Inclusive of all taxes. EMI starts at ₹{(Math.round(product.price / 12)).toLocaleString('en-IN')}/month.
            </div>
          </div>

          {/* About this item / Features */}
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>
              About this item
            </h4>
            <ul className="amz-detail-bullets">
              {product.features.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>

          {/* Specifications Table */}
          {product.specs && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>
                Technical Details
              </h4>
              <table className="amz-detail-specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Buy Action Box */}
          <div className="amz-detail-buy-box">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#007600', fontSize: '16px', fontWeight: '700' }}>
                In Stock.
              </span>
              <div className="amz-qty-selector" style={{ margin: 0 }}>
                <span>Quantity:</span>
                <button className="amz-qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span style={{ width: '20px', textAlign: 'center' }}>{qty}</span>
                <button className="amz-qty-btn" onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
              </div>
            </div>

            <div className="amz-detail-actions">
              <button 
                className={`amz-btn-add-cart ${addedFeedback ? 'added' : ''}`}
                style={{ padding: '12px', fontSize: '14px' }}
                onClick={handleAdd}
              >
                {addedFeedback ? (
                  <>
                    <Check size={18} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Add to Cart
                  </>
                )}
              </button>

              <button 
                className="amz-btn-buy-now"
                onClick={handleBuy}
              >
                <Zap size={16} style={{ display: 'inline', marginRight: '6px' }} />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
