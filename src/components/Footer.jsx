import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="amz-footer">
      {/* Back to top button */}
      <div className="amz-back-to-top" onClick={scrollToTop}>
        Back to top
      </div>

      {/* Directory Columns */}
      <div className="amz-footer-links-grid">
        <div className="amz-footer-col">
          <h4>Get to Know Us</h4>
          <ul>
            <li><a href="#about">About Amazon</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#press">Press Releases</a></li>
            <li><a href="#science">Amazon Science</a></li>
          </ul>
        </div>

        <div className="amz-footer-col">
          <h4>Connect with Us</h4>
          <ul>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#twitter">Twitter / X</a></li>
            <li><a href="#instagram">Instagram</a></li>
          </ul>
        </div>

        <div className="amz-footer-col">
          <h4>Make Money with Us</h4>
          <ul>
            <li><a href="#sell">Sell on Amazon</a></li>
            <li><a href="#accelerator">Amazon Global Selling</a></li>
            <li><a href="#affiliate">Become an Affiliate</a></li>
            <li><a href="#fulfilment">Fulfilment by Amazon</a></li>
            <li><a href="#advertise">Advertise Your Products</a></li>
          </ul>
        </div>

        <div className="amz-footer-col">
          <h4>Let Us Help You</h4>
          <ul>
            <li><a href="#covid">COVID-19 and Amazon</a></li>
            <li><a href="#account">Your Account</a></li>
            <li><a href="#returns">Returns Centre</a></li>
            <li><a href="#safety">100% Purchase Protection</a></li>
            <li><a href="#help">Help & Support</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="amz-footer-bottom">
        <div className="amz-footer-bottom-brand">
          amazon<span style={{ color: '#febd69', fontSize: '15px' }}>.in</span>
        </div>

        <div className="amz-footer-legal-links">
          <a href="#conditions">Conditions of Use & Sale</a>
          <a href="#privacy">Privacy Notice</a>
          <a href="#interest">Interest-Based Ads</a>
        </div>

        <div>
          &copy; 1996-2026, Amazon.com, Inc. or its affiliates. Simulated for demonstration.
        </div>
      </div>
    </footer>
  );
}
