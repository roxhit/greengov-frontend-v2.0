/*
  components/home/StatsSection.jsx — Animated Stats Counter
  ===========================================================
  This component demonstrates two important patterns:

  PATTERN 1 — Custom Hook (useCounter):
    A hook is a reusable function that contains React state/effects.
    useCounter counts from 0 up to a target number over a duration.
    It uses setInterval to increment a counter 60 times per second
    (every 16ms ≈ 60fps), exactly like an animation loop.

  PATTERN 2 — IntersectionObserver:
    This browser API detects when an element enters the viewport.
    We use it to START the counter animation only when the stats
    section scrolls into view — not immediately on page load.
    This avoids the counters finishing before the user sees them.
*/

import React, { useEffect, useRef, useState } from 'react';
import './StatsSection.css';

/* Static data — defined outside the component so it isn't recreated on each render */
const stats = [
  { val: 1247,   suffix: '+',   label: 'Active Projects',      icon: '🌿', color: '#7ec8a0' },
  { val: 840,    suffix: ' Cr', prefix: '₹', label: 'Subsidies Disbursed', icon: '💰', color: '#c9a84c' },
  { val: 98.7,   suffix: '%',   label: 'Compliance Rate',       icon: '✅', color: '#4a9b6f' },
  { val: 2400,   suffix: ' MW', label: 'Renewable Capacity',    icon: '⚡', color: '#7ec8a0' },
  { val: 120000, suffix: '+',   label: 'Beneficiaries',         icon: '👥', color: '#c9a84c' },
  { val: 99.9,   suffix: '%',   label: 'Platform Uptime',       icon: '🛡️', color: '#4a9b6f' },
];

/*
  useCounter — Custom Hook
  ========================
  A custom hook is just a function whose name starts with "use".
  It can use useState, useEffect, and other hooks internally.

  Parameters:
    target   — the final number to count up to (e.g. 1247)
    duration — how long the animation takes in ms (default 1800ms)
    start    — boolean that triggers the animation to begin

  HOW THE COUNTING WORKS:
  - step = how much to add per frame (target / total frames)
  - total frames = duration / 16 (because setInterval fires every 16ms)
  - Each interval, we add `step` to `current` until current ≥ target.
  - setCount updates the React state, triggering a re-render each frame.
  - clearInterval stops the timer when counting is complete.
*/
const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return; // don't start until the section is visible

    const totalFrames = duration / 16;     // how many frames in the animation
    const step = target / totalFrames;     // amount to add each frame
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target); // never exceed target
      setCount(current);
      if (current >= target) clearInterval(timer); // stop when done
    }, 16); // ~60fps

    return () => clearInterval(timer); // cleanup if component unmounts mid-count
  }, [target, duration, start]);

  return count;
};

/* StatCard renders one stat and calls useCounter to animate its number */
const StatCard = ({ stat, animate }) => {
  const count = useCounter(stat.val, 1800, animate);

  /*
    Format the number:
    - Decimals (like 98.7): show one decimal place
    - Integers (like 1247): format with Indian number commas (1,247)
  */
  const display = stat.val % 1 !== 0
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <div className="stat-card">
      {/* Icon with a tinted background using the stat's accent color */}
      <div className="stat-icon" style={{ background: `${stat.color}22`, color: stat.color }}>
        {stat.icon}
      </div>
      <div className="stat-num" style={{ color: stat.color }}>
        {stat.prefix || ''}{display}{stat.suffix}
      </div>
      <div className="stat-name">{stat.label}</div>
    </div>
  );
};

const StatsSection = () => {
  const [animate, setAnimate] = useState(false); // flip to true when section is visible
  const ref = useRef();

  /*
    IntersectionObserver — watches whether ref.current is visible on screen.
    threshold: 0.2 = trigger when 20% of the element is visible.

    HOW IT WORKS:
    1. Create an observer with a callback.
    2. The callback receives an array of "entries" (elements being watched).
    3. e.isIntersecting is true when the element enters the viewport.
    4. On intersection: set animate=true → useCounter hooks start counting.
    5. obs.disconnect() stops watching (we only want to trigger once).

    CLEANUP: disconnect the observer when the component unmounts.
  */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect(); // stop observing after first trigger
        }
      },
      { threshold: 0.2 } // 20% of the section must be visible
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-inner">
        <div className="stats-label">
          <span className="sl-line" />
          <span>Platform at a Glance</span>
          <span className="sl-line" />
        </div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
