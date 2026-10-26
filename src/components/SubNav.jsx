import React from 'react';
import { Menu, Zap } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function SubNav({
  selectedCategory,
  onSelectCategory,
  onOpenDrawer,
  onShowDealsOnly,
  dealsOnly
}) {
  return (
    <nav className="amz-subnav">
      <div className="amz-subnav-left">
        <button 
          className="amz-subnav-btn" 
          onClick={onOpenDrawer}
          title="All Departments"
        >
          <Menu size={18} />
          <span>All</span>
        </button>

        <button
          className={`amz-subnav-link ${dealsOnly ? 'active' : ''}`}
          onClick={onShowDealsOnly}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', color: dealsOnly ? '#febd69' : '#fff' }}
        >
          <Zap size={15} color="#febd69" fill="#febd69" />
          <span>Today's Deals</span>
        </button>

        {CATEGORIES.filter(c => c !== 'All').map((cat) => (
          <button
            key={cat}
            className={`amz-subnav-link ${selectedCategory === cat && !dealsOnly ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="amz-subnav-right">
        <span className="amz-prime-tag">
          JOIN PRIME • FREE 1-DAY DELIVERY
        </span>
      </div>
    </nav>
  );
}
