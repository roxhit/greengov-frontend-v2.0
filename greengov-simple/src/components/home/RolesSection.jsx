/*
  components/home/RolesSection.jsx — Tab Switcher
  ==================================================
  This component demonstrates the TABS PATTERN using useState.

  HOW THE TAB SWITCHER WORKS:
  1. `active` state holds the ID of the currently selected role.
  2. Clicking a tab button calls setActive(role.id).
  3. React re-renders the component with the new `active` value.
  4. The detail panel shows whichever role matches `active`.
  5. CSS conditionally applies the 'active' class to style the selected tab.

  This is a very common UI pattern (tabs, accordions, dropdowns)
  and useState is almost always the right tool for it.

  KEY CONCEPT — Derived State:
  We don't store the selected role OBJECT in state — just the ID string.
  Then we DERIVE the full role object: `roles.find(r => r.id === active)`.
  This is simpler and avoids having two pieces of state get out of sync.
*/

import React, { useState } from 'react';
import './RolesSection.css';

const roles = [
  {
    id: 'citizen',
    icon: '🧑‍🌾',
    title: 'Citizens & Businesses',
    color: '#7ec8a0',
    tagline: 'Apply, Track & Benefit',
    actions: [
      'Register and verify identity documents',
      'Apply for renewable energy programs',
      'Track incentive disbursements',
      'Monitor sustainability project status',
      'Receive real-time notifications',
    ],
    cta: 'Register as Citizen',
    link: '/register/citizen',
  },
  {
    id: 'officer',
    icon: '👷',
    title: 'Environmental Officers',
    color: '#4a9b6f',
    tagline: 'Validate & Manage',
    actions: [
      'Review and validate applications',
      'Manage sustainability projects',
      'Disburse approved incentives',
      'Update project milestones',
      'Generate compliance reports',
    ],
    cta: 'Officer Portal',
    link: '/login/officer',
  },
  {
    id: 'manager',
    icon: '📐',
    title: 'Program Managers',
    color: '#c9a84c',
    tagline: 'Oversee & Optimize',
    actions: [
      'Design and oversee energy programs',
      'Monitor budget utilization',
      'Analyze program performance KPIs',
      'Manage resource allocation',
      'Access advanced analytics',
    ],
    cta: 'Manager Console',
    link: '/login/manager',
  },
  {
    id: 'auditor',
    icon: '🔍',
    title: 'Auditors & Compliance',
    color: '#1a6b4a',
    tagline: 'Review & Ensure',
    actions: [
      'Audit compliance records',
      'Review program utilization data',
      'Access immutable audit logs',
      'Generate compliance findings',
      'Monitor policy adherence',
    ],
    cta: 'Auditor Dashboard',
    link: '/login/auditor',
  },
];

const RolesSection = () => {
  /*
    useState('citizen') initializes with 'citizen' as the default active tab.
    `active` is a string: 'citizen' | 'officer' | 'manager' | 'auditor'
  */
  const [active, setActive] = useState('citizen');

  /*
    Derive the current role object from the active ID.
    .find() searches the array and returns the first match.
  */
  const role = roles.find((r) => r.id === active);

  return (
    <section className="roles-section" id="about">
      <div className="section-container">

        <div className="section-header">
          <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Built for Everyone
          </span>
          <h2 className="section-title" style={{ color: 'white' }}>
            One Platform,<span className="title-em-light"> Multiple Roles</span>
          </h2>
          <p className="section-desc" style={{ color: 'rgba(255,255,255,0.65)' }}>
            GreenGov serves every stakeholder in the green governance ecosystem.
          </p>
        </div>

        <div className="roles-layout">

          {/* Tab Buttons Column */}
          <div className="roles-tabs">
            {roles.map((r) => (
              <button
                key={r.id}
                className={`role-tab ${active === r.id ? 'active' : ''}`}
                onClick={() => setActive(r.id)} // update active when clicked
                /*
                  Dynamic border and text color only when this tab is active.
                  Inactive tabs use the default CSS color (muted).
                */
                style={active === r.id ? { borderColor: r.color, color: r.color } : {}}
              >
                <span className="rt-icon">{r.icon}</span>
                <div className="rt-text">
                  <span className="rt-title">{r.title}</span>
                  <span className="rt-sub">{r.tagline}</span>
                </div>
                {/* Active indicator dot — only shown for the active tab */}
                {active === r.id && (
                  <span className="rt-active-dot" style={{ background: r.color }} />
                )}
              </button>
            ))}
          </div>

          {/*
            Detail Panel — shows info for the currently selected role.
            key={active} is a trick: when `active` changes, React unmounts
            and remounts this element, resetting any animations or states inside.
            This makes it feel like a fresh panel on each tab switch.
          */}
          <div className="role-detail" key={active}>
            <div className="rd-header" style={{ borderColor: `${role.color}40` }}>
              <div className="rd-icon" style={{ background: `${role.color}22`, color: role.color }}>
                {role.icon}
              </div>
              <div>
                <h3 className="rd-title">{role.title}</h3>
                <span className="rd-tagline" style={{ color: role.color }}>{role.tagline}</span>
              </div>
            </div>

            <ul className="rd-actions">
              {role.actions.map((action, i) => (
                <li key={i} className="rd-action-item">
                  <span className="rd-check" style={{ color: role.color }}>✓</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>

            <a href={role.link} className="rd-cta" style={{ background: role.color }}>
              {role.cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
