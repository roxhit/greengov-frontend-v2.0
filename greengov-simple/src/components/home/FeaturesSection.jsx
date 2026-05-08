/*
  components/home/FeaturesSection.jsx — Features Grid with Scroll Reveal
  ========================================================================
  This component demonstrates SCROLL REVEAL via IntersectionObserver.

  Each feature card starts invisible (opacity: 0, translateY: 20px).
  As the user scrolls and each card enters the viewport, we use
  IntersectionObserver to set opacity: 1 and translateY: 0 directly
  on the element's style. The CSS transition property makes it animate.

  This is different from StatsSection where we controlled state.
  Here we manipulate DOM element styles directly via the observer
  callback — a simpler approach when you just need CSS transitions.

  STAGGERED DELAY:
  Each card gets a transitionDelay proportional to its index.
  Card 0 = 0s delay, Card 1 = 0.08s, Card 2 = 0.16s, etc.
  This makes cards "cascade in" one after another, not all at once.
*/

import React, { useEffect, useRef } from 'react';
import './FeaturesSection.css';

const features = [
  { icon: '🌞', title: 'Renewable Energy Programs',    desc: 'Apply for solar, wind, and clean energy programs. Track approval status and project milestones in real-time.', tag: 'Energy',         color: '#c9a84c' },
  { icon: '💰', title: 'Incentive & Subsidy Management', desc: 'Automated allocation and transparent tracking of green subsidies and incentives for eligible citizens.', tag: 'Finance',        color: '#7ec8a0' },
  { icon: '📋', title: 'Compliance Monitoring',        desc: 'Stay ahead of environmental regulations with automated alerts, audit trails, and compliance dashboards.', tag: 'Compliance',     color: '#4a9b6f' },
  { icon: '📊', title: 'Analytics & Reporting',        desc: 'Rich dashboards and KPI reports for program efficiency, budget utilization, and sustainability impact.', tag: 'Analytics',      color: '#c9a84c' },
  { icon: '🏗️', title: 'Infrastructure Tracking',      desc: 'Monitor solar plants, wind farms, and recycling units — capacity, status, location, and maintenance.', tag: 'Infrastructure', color: '#7ec8a0' },
  { icon: '🔔', title: 'Smart Notifications',          desc: 'Instant in-app, SMS, and email alerts for program updates, approval milestones, and compliance deadlines.', tag: 'Alerts',        color: '#4a9b6f' },
];

const FeaturesSection = () => {
  const sectionRef = useRef(); // reference to the whole section element

  useEffect(() => {
    /*
      querySelectorAll returns all .feat-card elements inside sectionRef.current.
      We want to observe each card individually so each can reveal independently.
    */
    const cards = sectionRef.current?.querySelectorAll('.feat-card');

    /*
      IntersectionObserver for scroll reveal.
      - threshold: 0.1 = trigger when 10% of the card is visible
      - rootMargin: '0px 0px -50px 0px' = shrinks the detection zone by 50px
        at the bottom, so cards trigger slightly before reaching the very edge.
    */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            /*
              When a card enters view, change its style directly.
              The CSS transition property (set below via style) animates
              these changes smoothly instead of snapping instantly.
            */
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    /*
      Set initial hidden state + staggered delay on each card,
      then start observing each one.
    */
    cards?.forEach((card, index) => {
      card.style.opacity = '0';                        // start invisible
      card.style.transform = 'translateY(20px)';       // start shifted down
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; // animate smoothly
      card.style.transitionDelay = `${index * 0.08}s`; // stagger: 0s, 0.08s, 0.16s...
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="features-section" id="features" ref={sectionRef}>
      <div className="section-container">

        <div className="section-header">
          <span className="section-eyebrow">What GreenGov Offers</span>
          <h2 className="section-title">
            Everything You Need to
            <span className="title-em"> Govern Green</span>
          </h2>
          <p className="section-desc">
            A comprehensive platform built for India's environmental governance —
            from citizen applications to auditor reporting, all in one secure system.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            /*
              Each card starts with opacity 0 (set by the useEffect above).
              IntersectionObserver sets opacity to 1 when it scrolls into view.
              The CSS transition animates the change over 0.5s.
            */
            <div className="feat-card" key={i}>
              <div className="feat-top">
                {/* Icon with semi-transparent background in the feature's accent color */}
                <div className="feat-icon" style={{ background: `${f.color}18`, color: f.color }}>
                  {f.icon}
                </div>
                <span className="feat-tag" style={{ color: f.color, background: `${f.color}15` }}>
                  {f.tag}
                </span>
              </div>
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-desc">{f.desc}</p>
              <div className="feat-arrow" style={{ color: f.color }}>
                Learn more →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
