/*
  components/home/HeroSection.jsx — Hero / Banner Section
  ==========================================================
  This component demonstrates two advanced visual effects:

  EFFECT 1 — Canvas Particle Animation (useRef + useEffect):
    We draw animated floating dots on an HTML <canvas> element.
    The animation loop uses requestAnimationFrame (like setInterval
    but synced to screen refresh for smooth 60fps animation).

  EFFECT 2 — CSS-only visual effects:
    - Background "orbs": blurred radial-gradient divs create a glow
    - Grid overlay: repeating CSS gradient lines form a subtle grid
    - .fade-up class: keyframe animation defined in global.css
    - .float class: up-down bobbing animation on the visual card
    - .headline-accent: gradient text with a sliding shimmer animation
    - Scroll indicator: animated dot inside a mouse icon shape
*/

import React, { useEffect, useRef } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  /*
    useRef creates a reference to the <canvas> DOM element.
    canvasRef.current gives us direct access to the element
    so we can call canvas drawing APIs (getContext, drawArc, etc.)
    This is how React allows direct DOM manipulation without
    breaking its virtual DOM system.
  */
  const canvasRef = useRef(null);

  /*
    useEffect runs AFTER the component is painted to the screen.
    The [] dependency array means: run this effect only ONCE on mount.

    WHY WE NEED useEffect FOR THE CANVAS:
    The canvas element must exist in the DOM before we can draw on it.
    useEffect guarantees the DOM is ready.
  */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d'); // '2d' = standard 2D drawing context
    let animationFrameId;

    /*
      resize() makes the canvas resolution match its CSS size.
      Without this, drawings appear blurry or scaled incorrectly.
      canvas.offsetWidth/Height = actual pixel size on screen.
    */
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /*
      Create 50 particle objects.
      Each particle has:
        x, y   — position on canvas
        r      — radius (size of the dot)
        vx, vy — velocity (speed and direction per frame)
        alpha  — transparency (0=invisible, 1=solid)
    */
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 2 + 0.5,          // radius 0.5–2.5 px
        vx:    (Math.random() - 0.5) * 0.3,      // horizontal drift -0.15 to +0.15
        vy:    -(Math.random() * 0.5 + 0.2),     // always drifting upward
        alpha: Math.random() * 0.5 + 0.1,        // opacity 0.1–0.6
      });
    }

    /*
      draw() is the animation loop function.
      It runs ~60 times per second via requestAnimationFrame.

      EACH FRAME:
      1. Clear the canvas (erase previous frame).
      2. Loop through every particle:
         a. Draw a filled circle at (p.x, p.y) with radius p.r.
         b. Move the particle by adding velocity to position.
         c. If particle drifts off-screen, reset it to the bottom.
    */
    const draw = () => {
      // Step 1: erase last frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Step 2a: draw this particle as a small filled circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); // full circle (0 to 2π radians)
        ctx.fillStyle = `rgba(126, 200, 160, ${p.alpha})`; // mint green with alpha
        ctx.fill();

        // Step 2b: move the particle for next frame
        p.x += p.vx;
        p.y += p.vy;

        // Step 2c: wrap particles back to bottom when they go off the top
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        // Bounce horizontally off the sides
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      });

      /*
        requestAnimationFrame tells the browser:
        "call draw() again before the next screen repaint."
        This creates a smooth, continuous animation loop.
        Store the ID so we can cancel it in the cleanup.
      */
      animationFrameId = requestAnimationFrame(draw);
    };

    draw(); // Start the animation loop

    /*
      CLEANUP — runs when the component is removed from the DOM.
      cancelAnimationFrame stops the loop.
      removeEventListener prevents memory leaks from the resize handler.
    */
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []); // empty [] = run once on mount

  return (
    <section className="hero-section" id="hero">

      {/*
        The canvas sits behind all content (z-index handled in CSS).
        ref={canvasRef} connects this DOM node to our canvasRef hook above.
      */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/*
        Background Orbs — pure CSS visual effect.
        These are <div>s with:
          - border-radius: 50% → circular shape
          - radial-gradient background → color fades to transparent
          - filter: blur(80px) → heavy blur makes them soft "glow" blobs
        They are absolutely positioned behind the content.
      */}
      <div className="hero-bg">
        <div className="bg-orb orb-1" />   {/* top-right green glow */}
        <div className="bg-orb orb-2" />   {/* bottom-left gold glow */}
        <div className="bg-orb orb-3" />   {/* center mint glow */}
      </div>

      {/*
        Grid Overlay — subtle grid lines via CSS background-image.
        Uses two repeating linear-gradients at 90° to form a grid.
        See HeroSection.css .hero-grid-overlay for the pattern.
      */}
      <div className="hero-grid-overlay" />

      {/* Main content */}
      <div className="hero-content">

        {/*
          .fade-up class applies the fadeUp keyframe from global.css.
          animationDelay staggers each element so they appear one after another,
          creating a cascading entrance effect. (0.1s → 0.25s → 0.4s → etc.)
        */}
        <div className="hero-badge fade-up" style={{ animationDelay: '0.1s' }}>
          {/*
            The badge dot has a ::after pseudo-element in CSS that animates
            as a pulsing ring — the pulse-ring keyframe in global.css.
          */}
          <span className="badge-dot" />
          <span>India's Premier Green Governance Platform</span>
        </div>

        <h1 className="hero-headline fade-up" style={{ animationDelay: '0.25s' }}>
          Powering a
          {/*
            .headline-accent uses a gradient as text color via:
              background: linear-gradient(...)
              background-clip: text
              -webkit-text-fill-color: transparent
            The shimmer animation shifts background-position to make
            the gradient slide across the text continuously.
          */}
          <span className="headline-accent"> Sustainable</span>
          <br />Future for India
        </h1>

        <p className="hero-sub fade-up" style={{ animationDelay: '0.4s' }}>
          A unified digital platform for environmental ministries, energy boards, and citizens
          to manage green initiatives, track compliance, and accelerate India's clean energy transition.
        </p>

        {/* Call-to-action buttons */}
        <div className="hero-ctas fade-up" style={{ animationDelay: '0.55s' }}>
          <a href="/register" className="cta-primary">Start Your Green Journey →</a>
          <a href="#programs" className="cta-secondary">▶ Explore Programs</a>
        </div>

        {/* Quick stats row */}
        <div className="hero-stats fade-up" style={{ animationDelay: '0.7s' }}>
          <div className="stat-pill">
            <span className="stat-val">2.4 GW</span>
            <span className="stat-label">Renewable Capacity</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-pill">
            <span className="stat-val">₹840 Cr</span>
            <span className="stat-label">Subsidies Distributed</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-pill">
            <span className="stat-val">1.2 Lakh</span>
            <span className="stat-label">Active Beneficiaries</span>
          </div>
        </div>
      </div>

      {/*
        Hero Visual Card — floats on the right side.
        .float class applies the float keyframe (bobs up and down).
        .fade-up gives it an entrance animation.
      */}
      <div className="hero-visual fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="visual-card float">
          <div className="vis-inner">

            {/*
              Donut Chart — built with SVG <circle> elements.
              The trick: strokeDasharray sets a dash pattern.
              e.g. "220 80" = 220px colored dash + 80px gap = 73% of circumference.
              strokeDashoffset shifts the start of the dash around the circle.
              The SVG is rotated -90° in CSS so it starts from the top.
            */}
            <div className="donut-wrap">
              <svg viewBox="0 0 120 120" className="donut-svg">
                {/* Track (background circle) */}
                <circle cx="60" cy="60" r="48"
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="14"
                />
                {/* Green segment (73%) */}
                <circle cx="60" cy="60" r="48"
                  fill="none"
                  stroke="#7ec8a0"
                  strokeWidth="14"
                  strokeDasharray="220 80"
                  strokeDashoffset="60"
                  strokeLinecap="round"
                />
                {/* Gold segment (18%) */}
                <circle cx="60" cy="60" r="48"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="14"
                  strokeDasharray="60 240"
                  strokeDashoffset="-160"
                  strokeLinecap="round"
                />
                {/* Centre label */}
                <text x="60" y="56" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">73%</text>
                <text x="60" y="72" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">Green Target</text>
              </svg>
            </div>

            {/* Legend */}
            <div className="vis-legend">
              <div className="legend-item">
                <span className="leg-dot" style={{ background: '#7ec8a0' }} />
                <span>Renewable</span>
                <strong>73%</strong>
              </div>
              <div className="legend-item">
                <span className="leg-dot" style={{ background: '#c9a84c' }} />
                <span>In Progress</span>
                <strong>18%</strong>
              </div>
              <div className="legend-item">
                <span className="leg-dot" style={{ background: 'rgba(255,255,255,0.2)' }} />
                <span>Pending</span>
                <strong>9%</strong>
              </div>
            </div>

            {/* Mini project progress bars */}
            <div className="vis-projects">
              {[
                { icon: '☀️', label: 'Solar Initiative Phase 3', pct: 82, color: '#c9a84c' },
                { icon: '💨', label: 'Wind Farm Expansion',      pct: 65, color: '#7ec8a0' },
                { icon: '♻️', label: 'Urban Recycling Network',  pct: 48, color: '#4a9b6f' },
              ].map((proj) => (
                <div className="mini-proj" key={proj.label}>
                  <span className="mp-icon">{proj.icon}</span>
                  <div className="mp-info">
                    <span>{proj.label}</span>
                    {/* Progress bar: width % is set inline */}
                    <div className="mp-bar">
                      <div style={{ width: `${proj.pct}%`, background: proj.color }} />
                    </div>
                  </div>
                  <span className="mp-pct">{proj.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating mini badges — absolutely positioned over the card */}
          <div className="floating-badge badge-top">
            <span>🌱</span>
            <div>
              <div className="fb-val">+14.2%</div>
              <div className="fb-label">YoY Growth</div>
            </div>
          </div>
          <div className="floating-badge badge-bottom">
            <span>⚡</span>
            <div>
              <div className="fb-val">98.7%</div>
              <div className="fb-label">Compliance Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/*
        Scroll Indicator — a mouse-shaped icon with an animated dot inside.
        The scrollWheel keyframe in global.css moves the dot up and down.
        Pure CSS; no JavaScript needed.
      */}
      <div className="scroll-cue">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default HeroSection;
