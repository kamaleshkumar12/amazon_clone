import React from 'react';
import { X, Package, Truck } from 'lucide-react';

export default function OrdersModal({ isOpen, onClose, orders }) {
  if (!isOpen) return null;

  return (
    <div className="amz-modal-backdrop" onClick={onClose}>
      <div 
        className="amz-checkout-modal"
        style={{ maxWidth: '850px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="amz-modal-close" 
          onClick={onClose}
          aria-label="Close orders modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <Package size={28} color="#e77600" />
          <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Your Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#565959' }}>
            <Package size={50} color="#d5d9d9" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f1111', marginBottom: '6px' }}>
              No orders placed yet
            </h3>
            <p style={{ fontSize: '14px', marginBottom: '18px' }}>
              When you complete an order, it will appear here with live tracking.
            </p>
            <button 
              className="amz-btn-checkout"
              style={{ width: 'auto', padding: '8px 24px' }}
              onClick={onClose}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((order) => (
              <div 
                key={order.id} 
                style={{
                  border: '1px solid #d5d9d9',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#ffffff'
                }}
              >
                {/* Order Top Bar */}
                <div style={{
                  background: '#f0f2f2',
                  padding: '12px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  fontSize: '12px',
                  color: '#565959'
                }}>
                  <div>
                    <span style={{ textTransform: 'uppercase', display: 'block' }}>Order Placed</span>
                    <strong style={{ color: '#0f1111', fontSize: '13px' }}>{order.date}</strong>
                  </div>
                  <div>
                    <span style={{ textTransform: 'uppercase', display: 'block' }}>Total</span>
                    <strong style={{ color: '#b12704', fontSize: '13px' }}>₹{order.total.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span style={{ textTransform: 'uppercase', display: 'block' }}>Ship To</span>
                    <strong style={{ color: '#007185', fontSize: '13px' }}>{order.address.fullName}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ textTransform: 'uppercase', display: 'block' }}>Order # {order.id}</span>
                    <span style={{ color: '#007185', fontWeight: '600' }}>Invoice</span>
                  </div>
                </div>

                {/* Tracking Progress */}
                <div style={{ padding: '16px 18px', borderBottom: '1px solid #e2e8f0', background: '#fafbfc' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', fontWeight: '700', fontSize: '15px', marginBottom: '8px' }}>
                    <Truck size={18} />
                    <span>Arriving Tomorrow by 11 AM</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Status: <strong style={{ color: '#0f1111' }}>{order.status}</strong>
                  </div>
                </div>

                {/* Items in order */}
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#f8fafc', padding: '4px', borderRadius: '4px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#0f1111', marginBottom: '4px' }}>
                          {item.title}
                        </h4>
                        <div style={{ fontSize: '13px', color: '#565959' }}>
                          Qty: <strong>{item.quantity}</strong> | Price: <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                        </div>
                      </div>
                      <button 
                        style={{
                          padding: '6px 14px',
                          background: '#ffd814',
                          border: '1px solid #fcd200',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        Buy it again
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
