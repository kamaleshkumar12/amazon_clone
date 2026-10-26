import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';

export default function HeroBanner({ onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div 
      className="amz-hero-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div 
            key={slide.id}
            className={`amz-hero-slide ${isActive ? 'active' : ''}`}
            style={{ background: slide.gradient }}
          >
            <div className="amz-hero-content">
              <span className="amz-hero-badge">{slide.badge}</span>
              <h1 className="amz-hero-title">{slide.title}</h1>
              <p className="amz-hero-subtitle">{slide.subtitle}</p>
              <button 
                className="amz-hero-btn"
                onClick={() => onSelectCategory(slide.category)}
              >
                {slide.ctaText}
              </button>
            </div>

            <div className="amz-hero-img-box">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="amz-hero-img" 
              />
            </div>
          </div>
        );
      })}

      {/* Nav Controls */}
      <button 
        className="amz-hero-control prev"
        onClick={handlePrev}
        aria-label="Previous banner"
      >
        <ChevronLeft size={30} />
      </button>

      <button 
        className="amz-hero-control next"
        onClick={handleNext}
        aria-label="Next banner"
      >
        <ChevronRight size={30} />
      </button>

      {/* Bottom fade blending with main page background */}
      <div className="amz-hero-bottom-fade" />
    </div>
  );
}
