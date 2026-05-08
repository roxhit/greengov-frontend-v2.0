/*
  components/layout/Navbar.jsx — Navigation Bar
  ================================================
  This component demonstrates two important React patterns:

  PATTERN 1 — useState for UI toggle:
    The mobile menu is either open or closed. useState holds this boolean.
    Clicking the hamburger button flips true↔false.

  PATTERN 2 — useEffect + window event listener:
    We watch the scroll position AFTER the component mounts.
    When the user scrolls past 60px, we add the "scrolled" CSS class
    which changes the navbar background from transparent to solid.
    The cleanup function removes the listener when the component unmounts
    (prevents memory leaks).
*/

import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  // scrolled: true when user has scrolled more than 60px down the page
  const [scrolled, setScrolled] = useState(false);

  // menuOpen: true when the mobile hamburger menu is expanded
  const [menuOpen, setMenuOpen] = useState(false);

  /*
    useEffect — runs AFTER the component is added to the DOM.
    The [] dependency array means: run this effect only ONCE on mount.

    HOW THE SCROLL EFFECT WORKS:
    1. We define handleScroll — checks window.scrollY (how far the page is scrolled).
    2. We attach it to the window's "scroll" event.
    3. Every time the user scrolls, handleScroll runs and updates `scrolled`.
    4. React re-renders the navbar with the new `scrolled` value.
    5. The CSS class "scrolled" is toggled → triggers the CSS transition.

    CLEANUP (return function):
    When the Navbar is removed from the page, the returned function runs.
    It removes the scroll listener so it doesn't keep running in the background.
  */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60); // true if scrolled more than 60px
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // empty array = run once after first render

  return (
    /*
      Template literal in className: adds 'scrolled' class conditionally.
      CSS in Navbar.css listens for .gg-navbar.scrolled to change the background.
    */
    <nav className={`gg-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        {/* Logo / Brand */}
        <a href="/" className="nav-brand">
          <span className="brand-icon">🌿</span>
          <div className="brand-text">
            <span className="brand-name">GreenGov</span>
            <span className="brand-tagline">Sustainability Platform</span>
          </div>
        </a>

        {/* Desktop navigation links */}
        <ul className="nav-links">
          <li><a href="#programs">Programs</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#impact">Impact</a></li>
          <li><a href="#about">About</a></li>
        </ul>

        {/* Action buttons */}
        <div className="nav-actions">
          <a href="/login" className="btn-login">Sign In</a>
          <a href="/register" className="btn-register">Get Started →</a>
        </div>

        {/*
          Hamburger button — only visible on mobile (CSS hides it on desktop).
          onClick toggles menuOpen between true and false.
          The CSS class "open" changes the span bars into an X shape.
        */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>

      {/*
        Mobile dropdown menu.
        The CSS class "active" slides it into view.
        Each link closes the menu on click via onClick={() => setMenuOpen(false)}.
      */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a></li>
          <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
          <li><a href="#impact"   onClick={() => setMenuOpen(false)}>Impact</a></li>
          <li><a href="#about"    onClick={() => setMenuOpen(false)}>About</a></li>
          <li className="mobile-cta">
            <a href="/login">Sign In</a>
            <a href="/register" className="mobile-register">Get Started</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
