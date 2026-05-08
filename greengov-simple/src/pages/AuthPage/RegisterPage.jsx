import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/home/Footer';
import Sidebar from '../../components/layout/SideBar';

const RegisterPage = () => {
  const [role, setRole] = useState('CITIZEN');
  const [officerType, setOfficerType] = useState('');

  const PrimaryRole = ['CITIZEN', 'BUSINESS_OWNER', 'OFFICER'];
  const OfficerType = [
    'DISBURSEMENT_OFFICER',
    'COMPLIANCE_OFFICER',
    'AUDIT_MANAGER',
    'PROGRAM_MANAGER',
    'ENVIRONMENT_OFFICER'
  ];

  // Colors from Hero
  const COLORS = {
    primary: '#1a5c40',
    accent: '#7ec8a0',
    bg: 'linear-gradient(135deg, #06200f 0%, #0f3d2e 40%, #1a5c40 70%, #0d3525 100%)'
  };

  const glassStyle = {
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
    maxHeight: '95vh'
  };

  const inputStyle = {
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    borderRadius: '10px'
  };

  return (
    <>
      <Navbar />
      
      <main
        className="d-flex align-items-center justify-content-center position-relative"
        style={{
          height: '100vh',
          background: COLORS.bg,
          overflow: 'hidden'
        }}
      >
        {/* Hero-style background orbs */}
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(74,155,111,0.35), transparent)',
            top: '-10%',
            right: '-5%',
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(126,200,160,0.25), transparent)',
            bottom: '5%',
            left: '-5%',
          }}
        />

        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">

              <div className="card text-white shadow-lg p-1" style={glassStyle}>
                <div className="card-body p-3 p-lg-4">

                  {/* Header */}
                  <div className="text-center mb-3">
                    <h4 className="fw-bold mb-1">
                      Join the <span style={{ color: COLORS.accent }}>Mission</span>
                    </h4>
                    <p className="text-white-50 small mb-0">
                      Build India's green future 🌱
                    </p>
                  </div>

                  <form onSubmit={(e) => e.preventDefault()}>

                    {/* Name */}
                    <div className="mb-3">
                      <label className="small text-white-50 mb-1 ms-1">FULL NAME</label>
                      <input
                        className="form-control p-2 shadow-none"
                        style={inputStyle}
                        placeholder="Rahul Sharma"
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label className="small text-white-50 mb-1 ms-1">EMAIL</label>
                      <input
                        type="email"
                        className="form-control p-2 shadow-none"
                        style={inputStyle}
                        placeholder="name@email.com"
                      />
                    </div>

                    {/* Role Toggle */}
                    <div className="mb-3">
                      <label className="small text-white-50 mb-1 ms-1">ROLE</label>
                      <div className="p-1 d-flex bg-black bg-opacity-25" style={{ borderRadius: '12px' }}>
                        {PrimaryRole.map((r) => (
                          <button
                            key={r}
                            type="button"
                            className="btn flex-grow-1 border-0 py-1"
                            style={{
                              borderRadius: '10px',
                              fontSize: '0.75rem',
                              backgroundColor: role === r ? COLORS.primary : 'transparent',
                              color: role === r ? '#fff' : 'rgba(255,255,255,0.6)'
                            }}
                            onClick={() => setRole(r)}
                          >
                            {r.split('_')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Officer Type */}
                    {role === 'OFFICER' && (
                      <div className="mb-3">
                        <label className="small text-white-50 mb-1 ms-1">OFFICER TYPE</label>
                        <select
                          className="form-select p-2 shadow-none"
                          style={inputStyle}
                          value={officerType}
                          onChange={(e) => setOfficerType(e.target.value)}
                        >
                          <option value="">Select</option>
                          {OfficerType.map((type) => (
                            <option key={type} value={type} className="bg-dark">
                              {type.replaceAll('_', ' ')}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Password */}
                    <div className="mb-3">
                      <label className="small text-white-50 mb-1 ms-1">PASSWORD</label>
                      <input
                        type="password"
                        className="form-control p-2 shadow-none"
                        style={inputStyle}
                        placeholder="••••••"
                      />
                    </div>

                    {/* Terms */}
                    <div className="form-check mb-3 ms-1">
                      <input className="form-check-input" type="checkbox" id="terms" />
                      <label className="form-check-label small text-white-50" htmlFor="terms">
                        Accept Terms
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      className="btn w-100 fw-bold py-2"
                      style={{
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.primary})`,
                        color: '#06200f'
                      }}
                    >
                      CREATE ACCOUNT
                    </button>

                  </form>

                  {/* Footer */}
                  <div className="text-center mt-2">
                    <p className="small text-white-50 mb-0">
                      Already have an account?{' '}
                      <a href="/login" style={{ color: COLORS.accent }} className="fw-bold text-decoration-none">
                        Login
                      </a>
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RegisterPage;