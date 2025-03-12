import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We're passionate about bringing delicious recipes to your home kitchen.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/create-recipe">Create Recipe</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><span>Facebook</span></a>
            <a href="#" aria-label="Twitter"><span>Twitter</span></a>
            <a href="#" aria-label="Instagram"><span>Instagram</span></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Recipe App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;