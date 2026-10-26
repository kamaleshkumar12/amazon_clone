import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Check, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  onApplyCoupon,
  discountAmount
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const rawSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const finalSubtotal = Math.max(0, rawSubtotal - discountAmount);

  // Free delivery threshold: ₹499
  const freeDeliveryThreshold = 499;
  const isFreeDelivery = rawSubtotal >= freeDeliveryThreshold;
  const diffForFree = Math.max(0, freeDeliveryThreshold - rawSubtotal);
  const progressPercent = Math.min(100, Math.round((rawSubtotal / freeDeliveryThreshold) * 100));

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'AMAZON500') {
      onApplyCoupon('AMAZON500', 500);
      setCouponMsg('₹500 Instant Discount Applied!');
    } else if (code === 'PRIME20') {
      const discount = Math.round(rawSubtotal * 0.2);
      onApplyCoupon('PRIME20', discount);
      setCouponMsg('20% Prime Discount Applied!');
    } else {
      setCouponMsg('Invalid coupon code. Try AMAZON500 or PRIME20');
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="amz-modal-backdrop" 
          onClick={onClose}
          style={{ zIndex: 340 }}
        />
      )}

      <div className={`amz-cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="amz-cart-header">
          <div className="amz-cart-header-title">
            <ShoppingBag size={22} color="#febd69" />
            <span>Shopping Cart ({totalItems} items)</span>
          </div>
          <button onClick={onClose} style={{ color: '#fff' }}>
            <X size={22} />
          </button>
        </div>

        {/* Free delivery tracker */}
        <div className="amz-free-delivery-bar">
          <div className="amz-free-del-msg">
            {isFreeDelivery ? (
              <>
                <Check size={18} color="#166534" />
                <span>Your order qualifies for <strong>FREE Prime Delivery!</strong></span>
              </>
            ) : (
              <span>Add <strong>₹{diffForFree.toLocaleString('en-IN')}</strong> more for <strong>FREE Delivery</strong></span>
            )}
          </div>
          <div className="amz-progress-track">
            <div 
              className="amz-progress-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart items list */}
        <div className="amz-cart-items-list">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#565959' }}>
              <ShoppingBag size={56} color="#d5d9d9" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f1111', marginBottom: '8px' }}>
                Your Amazon Cart is empty
              </h3>
              <p style={{ fontSize: '14px', marginBottom: '20px' }}>
                Explore today's best deals and add items to your cart.
              </p>
              <button 
                className="amz-btn-checkout"
                onClick={onClose}
                style={{ width: 'auto', padding: '8px 24px', display: 'inline-block' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="amz-cart-item">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="amz-cart-item-img" 
                />
                <div className="amz-cart-item-info">
                  <h4 className="amz-cart-item-title">{item.title}</h4>
                  <div className="amz-cart-item-price">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>

                  <div className="amz-cart-item-controls">
                    {/* Stepper */}
                    <div className="amz-cart-stepper">
                      <button onClick={() => onUpdateQty(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, item.quantity + 1)}>+</button>
                    </div>

                    {/* Delete */}
                    <button 
                      className="amz-cart-item-remove"
                      onClick={() => onRemoveItem(item.id)}
                      title="Delete item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart footer & checkout */}
        {cartItems.length > 0 && (
          <div className="amz-cart-footer">
            {/* Promo Code Form */}
            <form onSubmit={handleCouponSubmit} className="amz-coupon-box">
              <input 
                type="text" 
                className="amz-coupon-input"
                placeholder="Enter Promo (e.g. AMAZON500)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button type="submit" className="amz-coupon-btn">
                Apply
              </button>
            </form>
            {couponMsg && (
              <div style={{ fontSize: '12px', color: discountAmount > 0 ? '#059669' : '#dc2626', marginBottom: '10px', fontWeight: '600' }}>
                {couponMsg}
              </div>
            )}

            {/* Discount summary if applied */}
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#059669', marginBottom: '8px' }}>
                <span>Coupon ({discountCode}):</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {/* Subtotal */}
            <div className="amz-cart-subtotal-row">
              <span style={{ fontWeight: '600' }}>Subtotal ({totalItems} items):</span>
              <span className="amz-cart-subtotal-price">
                ₹{finalSubtotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Checkout Button */}
            <button 
              className="amz-btn-checkout"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>Proceed to Buy ({totalItems} items)</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
