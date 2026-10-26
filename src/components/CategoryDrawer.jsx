import React from 'react';
import { X, User, ChevronRight, Zap, Flame, ShieldCheck, HelpCircle } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function CategoryDrawer({
  isOpen,
  onClose,
  onSelectCategory,
  selectedCategory,
  onShowDealsOnly
}) {
  if (!isOpen) return null;

  return (
    <div className="amz-modal-backdrop" onClick={onClose} style={{ zIndex: 400 }}>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '360px',
          maxWidth: '85vw',
          background: '#ffffff',
          boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 450,
          animation: 'slideInLeft 250ms ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* User sign-in header */}
        <div style={{
          background: '#232f3e',
          color: '#fff',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#37475a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={20} color="#febd69" />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#ccc' }}>Welcome</div>
            <div style={{ fontSize: '18px', fontWeight: '700' }}>Hello, Customer</div>
          </div>
          <button 
            onClick={onClose}
            style={{ marginLeft: 'auto', color: '#fff', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer contents */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          <div style={{ padding: '8px 24px', fontSize: '16px', fontWeight: '800', color: '#111' }}>
            Trending & Deals
          </div>
          <div 
            style={{
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onClick={() => {
              onShowDealsOnly();
              onClose();
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} color="#e47911" /> Today's Lightning Deals
            </span>
            <ChevronRight size={16} color="#888" />
          </div>
          <div 
            style={{
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onClick={() => {
              onSelectCategory('All');
              onClose();
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={18} color="#cc0c39" /> Best Sellers
            </span>
            <ChevronRight size={16} color="#888" />
          </div>

          <div style={{ height: '1px', background: '#e2e8f0', margin: '12px 0' }} />

          <div style={{ padding: '8px 24px', fontSize: '16px', fontWeight: '800', color: '#111' }}>
            Shop By Department
          </div>
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              style={{
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                color: selectedCategory === cat ? '#e47911' : '#333',
                background: selectedCategory === cat ? '#fffaf0' : 'transparent',
                fontWeight: selectedCategory === cat ? '700' : '400',
                fontSize: '14px'
              }}
              onClick={() => {
                onSelectCategory(cat);
                onClose();
              }}
            >
              <span>{cat === 'All' ? 'All Departments' : cat}</span>
              <ChevronRight size={16} color="#888" />
            </div>
          ))}

          <div style={{ height: '1px', background: '#e2e8f0', margin: '12px 0' }} />

          <div style={{ padding: '8px 24px', fontSize: '16px', fontWeight: '800', color: '#111' }}>
            Help & Settings
          </div>
          <div style={{ padding: '12px 24px', fontSize: '14px', color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={18} color="#007185" /> 100% Purchase Protection
          </div>
          <div style={{ padding: '12px 24px', fontSize: '14px', color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={18} color="#007185" /> Customer Service 24x7
          </div>
        </div>
      </div>
    </div>
  );
}
