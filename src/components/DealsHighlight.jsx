import React from 'react';
import { FEATURE_DEAL_CARDS } from '../data/products';

export default function DealsHighlight({ onSelectCategory }) {
  return (
    <div className="amz-features-grid">
      {FEATURE_DEAL_CARDS.map((card) => (
        <div 
          key={card.id} 
          className="amz-feat-card"
          onClick={() => onSelectCategory(card.category)}
        >
          <h2 className="amz-feat-title">{card.title}</h2>
          
          <div className="amz-feat-img-box">
            <img 
              src={card.image} 
              alt={card.title}
              className="amz-feat-img" 
            />
            <span className="amz-feat-tag">{card.tag}</span>
          </div>

          <span className="amz-feat-link">
            {card.linkText} &rarr;
          </span>
        </div>
      ))}
    </div>
  );
}
