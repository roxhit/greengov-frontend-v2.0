import React, { useState } from 'react';

const Sidebar = () => {
  const [active, setActive] = useState('Profile');

  const menuItems = [
    'Profile',
    'Programs',
    'Projects',
    'Subsidy Management',
    'Asset Management',
    'Compliance',
    'Analytics'
  ];

  const COLORS = {
    primary: '#1a5c40',   // main green
    accent: '#7ec8a0',    // mint
    dark: '#06200f'
  };

  return (
    <div
      className="d-flex flex-column p-3"
      style={{
        width: '260px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backdropFilter: 'blur(12px)',
        background: 'rgba(6, 32, 15, 0.85)', // ✅ darker for contrast
        borderRight: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      {/* Logo */}
      <div className="mb-4">
        <h5 className="fw-bold text-white">
          🌱 <span style={{ color: COLORS.accent }}>Green Portal</span>
        </h5>
      </div>

      {/* Menu */}
      <ul className="nav nav-pills flex-column gap-2">

        {menuItems.map((item) => (
          <li key={item}>
            <button
              className="nav-link w-100 text-start border-0"
              onClick={() => setActive(item)}
              style={{
                borderRadius: '10px',
                padding: '10px 14px',

                background:
                  active === item
                    ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.primary})`
                    : 'transparent',

                color:
                  active === item
                    ? COLORS.dark   // ✅ dark text on active
                    : '#ffffff',    // ✅ FIX: always visible

                fontWeight: active === item ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (active !== item) {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (active !== item) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              {item}
            </button>
          </li>
        ))}

      </ul>

      {/* Footer */}
      <div className="mt-auto small text-white-50">
        © 2026 Green Platform
      </div>
    </div>
  );
};

export default Sidebar;
