/*
  components/home/CTASection.jsx — Call to Action Section
  ==========================================================
  A purely presentational (stateless) component.
  No hooks, no effects — just JSX and CSS classes.

  This is the simplest type of React component.
  If a component has no state or side effects, write it as a
  plain function that returns JSX. No useState/useEffect needed.

  The animated background rings (.cta-bg-ring) are pure CSS:
  They are large circles that scale and fade via keyframe animations
  defined in CTASection.css. No JavaScript required.
*/

import React from 'react';
import './CTASection.css';

const CTASection = () => (
  <section className="cta-section">
    <div className="cta-inner">
      {/*
        Background decorative rings — absolutely positioned circles.
        CSS animates them with a slow pulsing scale effect.
        Pure CSS — no JavaScript.
      */}
      <div className="cta-bg-ring ring-1" />
      <div className="cta-bg-ring ring-2" />

      <div className="cta-content">
        <span className="cta-eyebrow">Join the Green Revolution</span>
        <h2 className="cta-title">
          Start Your Sustainability
          <br />Journey Today
        </h2>
        <p className="cta-sub">
          Whether you're a citizen applying for solar subsidies, a business seeking
          green compliance, or an officer managing programs — GreenGov is your gateway.
        </p>
        <div className="cta-buttons">
          <a href="/register" className="cta-btn primary">Create Free Account</a>
          <a href="/contact"  className="cta-btn secondary">Contact Support</a>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
