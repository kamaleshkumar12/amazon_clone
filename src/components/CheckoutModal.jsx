import React, { useState } from 'react';
import { 
  X, 
  Check, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  location,
  onOrderSuccess
}) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: 'Kamal Sharma',
    mobile: '+91 98765 43210',
    street: 'Flat 402, Lotus Residency, MG Road',
    city: location.city || 'Mumbai',
    state: 'Maharashtra',
    pincode: location.pincode || '400001'
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('kamal@okaxis');
  const [deliverySpeed, setDeliverySpeed] = useState('prime');
  const [placedOrder, setPlacedOrder] = useState(null);

  // Reset to step 1 whenever the modal opens.
  // eslint-disable-next-line react/set-state-in-effect -- intentional: reset on open
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPlacedOrder(null);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shippingFee = deliverySpeed === 'express' ? 99 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      // Place Order!
      const orderId = `408-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(1000000 + Math.random() * 9000000)}`;
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cartItems],
        total: finalTotal,
        address: { ...address },
        paymentMethod,
        deliverySpeed,
        status: 'Preparing for Dispatch'
      };

      setPlacedOrder(newOrder);
      onOrderSuccess(newOrder);
      setStep(4);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if confetti script unavailable
      }
    }
  };

  return (
    <div className="amz-modal-backdrop" onClick={step === 4 ? onClose : undefined}>
      <div 
        className="amz-checkout-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="amz-modal-close" 
          onClick={onClose}
          aria-label="Close checkout"
        >
          <X size={20} />
        </button>

        {/* Multi-step progress bar */}
        {step < 4 && (
          <div className="amz-checkout-steps-bar">
            <div className={`amz-checkout-step ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
              <div className="amz-step-num">{step > 1 ? <Check size={16} /> : '1'}</div>
              <span className="amz-step-label">Delivery Address</span>
            </div>

            <div style={{ height: '2px', background: step > 1 ? '#10b981' : '#e2e8f0', flex: 1, margin: '0 8px 16px 8px' }} />

            <div className={`amz-checkout-step ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
              <div className="amz-step-num">{step > 2 ? <Check size={16} /> : '2'}</div>
              <span className="amz-step-label">Payment Method</span>
            </div>

            <div style={{ height: '2px', background: step > 2 ? '#10b981' : '#e2e8f0', flex: 1, margin: '0 8px 16px 8px' }} />

            <div className={`amz-checkout-step ${step === 3 ? 'active' : ''}`}>
              <div className="amz-step-num">3</div>
              <span className="amz-step-label">Review & Place</span>
            </div>
          </div>
        )}

        {/* STEP 1: ADDRESS */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={22} color="#e77600" />
              Select a delivery address
            </h3>

            <form onSubmit={handleNextStep}>
              <div className="amz-form-group">
                <label className="amz-form-label">Full Name</label>
                <input 
                  type="text" 
                  className="amz-form-input" 
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                />
              </div>

              <div className="amz-form-group">
                <label className="amz-form-label">Mobile Number</label>
                <input 
                  type="text" 
                  className="amz-form-input" 
                  required
                  value={address.mobile}
                  onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
                />
              </div>

              <div className="amz-form-group">
                <label className="amz-form-label">Flat, House no., Building, Apartment</label>
                <input 
                  type="text" 
                  className="amz-form-input" 
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div className="amz-form-group">
                  <label className="amz-form-label">City</label>
                  <input 
                    type="text" 
                    className="amz-form-input" 
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                </div>
                <div className="amz-form-group">
                  <label className="amz-form-label">State</label>
                  <input 
                    type="text" 
                    className="amz-form-input" 
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  />
                </div>
                <div className="amz-form-group">
                  <label className="amz-form-label">Pincode</label>
                  <input 
                    type="text" 
                    className="amz-form-input" 
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="submit" className="amz-btn-checkout" style={{ width: 'auto', padding: '10px 32px' }}>
                  Use this address &rarr;
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: PAYMENT */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={22} color="#e77600" />
              Select a payment method
            </h3>

            <div className="amz-payment-options">
              {/* Amazon Pay UPI */}
              <div 
                className={`amz-payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <input 
                  type="radio" 
                  name="pay" 
                  checked={paymentMethod === 'upi'} 
                  onChange={() => setPaymentMethod('upi')}
                />
                <div style={{ flex: 1 }}>
                  <div className="amz-payment-title">Amazon Pay UPI / Any UPI App</div>
                  <div className="amz-payment-desc">Instant verification & refunds</div>
                  {paymentMethod === 'upi' && (
                    <input 
                      type="text" 
                      className="amz-form-input" 
                      style={{ marginTop: '8px', maxWidth: '300px' }}
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter your UPI ID (e.g. mobile@upi)"
                    />
                  )}
                </div>
              </div>

              {/* Credit / Debit Card */}
              <div 
                className={`amz-payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <input 
                  type="radio" 
                  name="pay" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')}
                />
                <div>
                  <div className="amz-payment-title">Credit or Debit Card</div>
                  <div className="amz-payment-desc">Visa, MasterCard, RuPay, Maestro, American Express</div>
                </div>
              </div>

              {/* Net Banking */}
              <div 
                className={`amz-payment-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('netbanking')}
              >
                <input 
                  type="radio" 
                  name="pay" 
                  checked={paymentMethod === 'netbanking'} 
                  onChange={() => setPaymentMethod('netbanking')}
                />
                <div>
                  <div className="amz-payment-title">Net Banking</div>
                  <div className="amz-payment-desc">HDFC, ICICI, SBI, Axis, Kotak and other major banks</div>
                </div>
              </div>

              {/* Cash on Delivery */}
              <div 
                className={`amz-payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <input 
                  type="radio" 
                  name="pay" 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')}
                />
                <div>
                  <div className="amz-payment-title">Cash on Delivery / Pay on Delivery</div>
                  <div className="amz-payment-desc">Scan and pay with UPI or cash at your doorstep</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                style={{ color: '#007185', fontWeight: '600', fontSize: '14px' }}
              >
                &larr; Back to Address
              </button>
              <button 
                type="button" 
                className="amz-btn-checkout" 
                style={{ width: 'auto', padding: '10px 32px' }}
                onClick={() => setStep(3)}
              >
                Continue to Review &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & PLACE ORDER */}
        {step === 3 && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>
              Review your order
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {/* Address Summary */}
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#565959', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Delivering to:
                </div>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>{address.fullName}</div>
                <div style={{ fontSize: '13px', color: '#333' }}>{address.street}</div>
                <div style={{ fontSize: '13px', color: '#333' }}>{address.city}, {address.state} - {address.pincode}</div>
                <div style={{ fontSize: '13px', color: '#333' }}>Phone: {address.mobile}</div>
              </div>

              {/* Payment Summary */}
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#565959', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Payment Method:
                </div>
                <div style={{ fontWeight: '700', fontSize: '14px', textTransform: 'uppercase' }}>
                  {paymentMethod === 'upi' ? `UPI (${upiId})` : paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Net Banking'}
                </div>
                <div style={{ fontSize: '12px', color: '#166534', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={16} /> 100% Safe & Secure Payment
                </div>
              </div>
            </div>

            {/* Delivery Speed Selector */}
            <div style={{ background: '#fffaf0', padding: '14px', borderRadius: '4px', border: '1px solid #fed7aa', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
                Choose delivery speed:
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', marginBottom: '6px' }}>
                <input 
                  type="radio" 
                  name="speed" 
                  checked={deliverySpeed === 'prime'} 
                  onChange={() => setDeliverySpeed('prime')} 
                />
                <span><strong>FREE Prime Delivery</strong> — Tomorrow, by 11:00 AM</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="speed" 
                  checked={deliverySpeed === 'express'} 
                  onChange={() => setDeliverySpeed('express')} 
                />
                <span><strong>Express Delivery (₹99)</strong> — Today evening, by 7:00 PM</span>
              </label>
            </div>

            {/* Price breakdown */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                <span>Items ({totalItems}):</span>
                <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#059669', marginBottom: '6px' }}>
                  <span>Coupon Savings:</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                <span>Delivery:</span>
                <span style={{ color: shippingFee === 0 ? '#059669' : '#111', fontWeight: shippingFee === 0 ? '700' : '400' }}>
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800', color: '#b12704', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                <span>Order Total:</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={() => setStep(2)}
                style={{ color: '#007185', fontWeight: '600', fontSize: '14px' }}
              >
                &larr; Back to Payment
              </button>
              <button 
                type="button" 
                className="amz-btn-checkout" 
                style={{ width: 'auto', padding: '12px 36px', fontSize: '16px' }}
                onClick={handleNextStep}
              >
                Place Your Order and Pay
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ORDER SUCCESS */}
        {step === 4 && placedOrder && (
          <div className="amz-order-success-box">
            <div className="amz-success-icon-wrap">
              <CheckCircle size={44} />
            </div>

            <h2 className="amz-success-title">Order Placed, Thank You!</h2>
            <p style={{ fontSize: '15px', color: '#565959', marginBottom: '14px' }}>
              Confirmation will be sent to your registered email and mobile number.
            </p>

            <div className="amz-order-id-badge">
              Order ID: #{placedOrder.id}
            </div>

            {/* Order snapshot card */}
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', textAlign: 'left', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Guaranteed Delivery</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f1111' }}>
                    {placedOrder.deliverySpeed === 'express' ? 'Today, by 7:00 PM' : 'Tomorrow, by 11:00 AM'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Paid via</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase' }}>
                    {placedOrder.paymentMethod}
                  </div>
                </div>
              </div>

              {/* Items summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {placedOrder.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                    <img src={item.image} alt={item.title} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </span>
                    <span style={{ fontWeight: '600' }}>x{item.quantity}</span>
                    <span style={{ fontWeight: '700', color: '#b12704' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="amz-btn-checkout"
              style={{ width: 'auto', padding: '10px 32px' }}
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
