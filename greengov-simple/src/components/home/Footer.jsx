/*
  components/home/Footer.jsx — Site Footer
  ==========================================
  A purely presentational component with no state or effects.
  Separated from CTASection into its own file for clarity:
  each component should have a single, clear responsibility.
  The original code exported both CTASection and Footer from
  one file — splitting them makes the codebase easier to navigate.
*/

import React from 'react';
import './Footer.css';

/* Footer links data — defined outside component so it's not recreated on render */
const footerLinks = [
  {
    heading: 'Platform',
    links: ['Programs', 'Incentives', 'Compliance', 'Analytics'],
  },
  {
    heading: 'For Users',
    links: ['Citizens Portal', 'Business Registration', 'Officer Login', 'Auditor Access'],
  },
  {
    heading: 'Government',
    links: ['Ministry of Environment', 'Energy Board', 'Policy Guidelines', 'RTI Requests'],
  },
  {
    heading: 'Support',
    links: ['Help Center', 'Documentation', 'Contact Us', 'Grievances'],
  },
];

const Footer = () => (
  <footer className="gg-footer">
    <div className="footer-container">

      {/* Brand column */}
      <div className="footer-brand">
        <div className="footer-logo">
          <span style={{ fontSize: '1.75rem' }}>🌿</span>
          <span>GreenGov</span>
        </div>
        <p>India's premier digital platform for environmental governance and green sustainability.</p>
        <div className="footer-socials">
          <a href="#" aria-label="Twitter">𝕏</a>
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="YouTube">▶</a>
        </div>
      </div>

      {/*
        .map() generates each link group column from the footerLinks array.
        Another <ul>.map() generates each <li> link within it.
        Nested maps keep the JSX clean instead of hard-coding every link.
      */}
      {footerLinks.map((group) => (
        <div className="footer-links-group" key={group.heading}>
          <h4>{group.heading}</h4>
          <ul>
            {group.links.map((link) => (
              <li key={link}><a href="#">{link}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="footer-bottom">
      <span>© 2025 GreenGov — Government of India. All Rights Reserved.</span>
      <div className="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Accessibility</a>
      </div>
    </div>
  </footer>
);

export default Footer;
