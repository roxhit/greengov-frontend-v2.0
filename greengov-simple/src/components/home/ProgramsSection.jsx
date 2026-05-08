/*
  components/home/ProgramsSection.jsx — Program Cards
  =====================================================
  This component demonstrates:

  PATTERN 1 — Array.map() for rendering lists:
    Instead of writing each card's JSX manually, we define data in an array
    and use .map() to generate JSX for each item automatically.
    The key prop helps React identify which items changed on re-render.

  PATTERN 2 — Conditional rendering with ternary:
    The "Apply Now" button changes text and disables itself based on program.status.
    Uses the ternary operator: condition ? valueIfTrue : valueIfFalse.

  PATTERN 3 — Dynamic inline styles:
    Colors are part of the data, applied via the style prop.
    Template literals build the semi-transparent background: `${color}18`
    (hex color + 18 = ~10% opacity in hex).
*/

import React from 'react';
import './ProgramsSection.css';

const programs = [
  {
    emoji: '☀️',
    title: 'National Solar Mission',
    category: 'Solar Energy',
    budget: '₹240 Cr',
    status: 'Open',
    statusColor: '#4a9b6f',
    progress: 68,
    applicants: '4,812',
    desc: 'Subsidies for rooftop solar installations for homes and small businesses across India.',
  },
  {
    emoji: '💨',
    title: 'Wind Energy Expansion',
    category: 'Wind Power',
    budget: '₹180 Cr',
    status: 'Open',
    statusColor: '#4a9b6f',
    progress: 45,
    applicants: '2,340',
    desc: 'Incentives for wind energy installations in coastal and high-wind regions.',
  },
  {
    emoji: '♻️',
    title: 'Urban Recycling Initiative',
    category: 'Recycling',
    budget: '₹95 Cr',
    status: 'Closing Soon',
    statusColor: '#c9a84c',
    progress: 82,
    applicants: '8,127',
    desc: 'Support for urban recycling centers, waste management units, and circular economy startups.',
  },
  {
    emoji: '🌊',
    title: 'Water Conservation Program',
    category: 'Water',
    budget: '₹120 Cr',
    status: 'Coming Soon',
    statusColor: '#7ec8a0',
    progress: 12,
    applicants: '—',
    desc: 'Grants for rainwater harvesting, watershed restoration, and smart irrigation systems.',
  },
];

const ProgramsSection = () => (
  <section className="programs-section" id="programs">
    <div className="section-container">

      <div className="programs-header">
        <div>
          <span className="section-eyebrow">Active Initiatives</span>
          <h2 className="section-title">
            Current <span className="title-em">Green Programs</span>
          </h2>
          <p className="section-desc">
            Apply for government-backed renewable energy and sustainability programs.
          </p>
        </div>
        <a href="/programs" className="view-all-btn">View All Programs →</a>
      </div>

      <div className="programs-grid">
        {/*
          programs.map() generates one <div className="prog-card"> per program.
          key={i} is required by React to track list items during re-renders.
        */}
        {programs.map((p, i) => (
          <div className="prog-card" key={i}>

            <div className="prog-head">
              <div className="prog-emoji">{p.emoji}</div>
              <div className="prog-meta">
                <span className="prog-category">{p.category}</span>
                {/*
                  Dynamic inline style:
                  - color: p.statusColor sets the text color
                  - background: `${p.statusColor}18` appends "18" to the hex color
                    (hex opacity: 18 hex = 24 decimal = ~9% opacity)
                  This lets each status badge have its own branded color.
                */}
                <span
                  className="prog-status"
                  style={{ color: p.statusColor, background: `${p.statusColor}18` }}
                >
                  {p.status}
                </span>
              </div>
            </div>

            <h3 className="prog-title">{p.title}</h3>
            <p className="prog-desc">{p.desc}</p>

            {/* Progress Bar — width is set as an inline style percentage */}
            <div className="prog-progress">
              <div className="prog-prog-info">
                <span>Budget Utilized</span>
                <span>{p.progress}%</span>
              </div>
              <div className="prog-bar">
                {/*
                  The fill's width is set to the progress percentage.
                  Color changes: gold when >75% (warning), green otherwise.
                  Ternary: condition ? 'gold' : 'green'
                */}
                <div
                  className="prog-bar-fill"
                  style={{
                    width: `${p.progress}%`,
                    background: p.progress > 75 ? '#c9a84c' : '#4a9b6f',
                  }}
                />
              </div>
            </div>

            <div className="prog-footer">
              <div className="prog-stat">
                <span className="ps-val">{p.budget}</span>
                <span className="ps-label">Total Budget</span>
              </div>
              <div className="prog-stat">
                <span className="ps-val">{p.applicants}</span>
                <span className="ps-label">Applicants</span>
              </div>
              {/*
                Conditional disable: if the program is "Coming Soon",
                disable pointer events and reduce opacity — visually greyed out.
                Ternary operator: condition ? styleIfTrue : styleIfFalse
              */}
              <a
                href="/programs/apply"
                className="prog-apply"
                style={p.status === 'Coming Soon'
                  ? { opacity: 0.5, pointerEvents: 'none' }
                  : {}}
              >
                {p.status === 'Coming Soon' ? 'Notify Me' : 'Apply Now'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProgramsSection;
