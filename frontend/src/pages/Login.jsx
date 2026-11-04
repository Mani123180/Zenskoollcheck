import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPortalData, isSchoolActive } from '../services/portalData';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activePreset, setActivePreset] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoCredentials = {
    superadmin: {
      label: 'Super Admin',
      user: 'superadmin@zenschool.com',
      pass: 'SuperAdmin@123',
      color: '#1e3a8a',
      badge: 'Platform Owner',
      schoolId: 'ALL'
    },
    schooladmin_ssv: {
      label: 'School Admin',
      user: 'admin@ssvschool.com',
      pass: 'Admin@12345',
      color: '#2563eb',
      badge: 'Campus Admin',
      schoolId: 'SCHOOL002'
    },
    finance_manager: {
      label: 'Finance Manager',
      user: 'finance@ssvschool.com',
      pass: 'Finance@12345',
      color: '#059669',
      badge: 'Finance Desk',
      schoolId: 'SCHOOL002'
    },
    principal: {
      label: 'Principal',
      user: 'principal@ssvschool.com',
      pass: 'principal123',
      color: '#7c3aed',
      badge: 'Leadership',
      schoolId: 'SCHOOL002'
    },
    teacher: {
      label: 'Teacher',
      user: 'teacher@ssvschool.com',
      pass: 'teacher123',
      color: '#0891b2',
      badge: 'Academic Faculty',
      schoolId: 'SCHOOL002'
    },
    student: {
      label: 'Student',
      user: 'student@ssvschool.com',
      pass: 'student123',
      color: '#d97706',
      badge: 'Student Portal',
      schoolId: 'SCHOOL002'
    },
    parent: {
      label: 'Parent',
      user: 'parent@ssvschool.com',
      pass: 'parent123',
      color: '#db2777',
      badge: 'Parent Guardian',
      schoolId: 'SCHOOL002'
    },
  };

  const handleFillDemo = async (key) => {
    let cred = { ...demoCredentials[key] };
    if (!cred) return;

    try {
      const store = getPortalData();
      if (store && store.users) {
        if (key === 'schooladmin_ssv') {
          const u = store.users.find((x) => x.username === 'admin_ssv' || x.email === 'admin@ssvschool.com');
          if (u && u.password && !u.password.startsWith('$2')) {
            cred.pass = u.password;
            if (u.username) cred.user = u.username;
          }
        } else if (key === 'finance_manager') {
          const u = store.users.find((x) => x.username === 'finance_ssv' || x.email === 'finance@ssvschool.com');
          if (u && u.password && !u.password.startsWith('$2')) {
            cred.pass = u.password;
            if (u.username) cred.user = u.username;
          }
        }
      }
    } catch (e) {}

    setActivePreset(key);
    setUsername(cred.user);
    setPassword(cred.pass);
    setError('');
    setSubmitting(true);
    const res = await login(cred.user, cred.pass);
    setSubmitting(false);
    if (res.success) {
      navigate('/portal');
    } else {
      setError(res.message || 'Login failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Invalid username/email or password.');
      return;
    }

    setError('');
    setSubmitting(true);
    const res = await login(username.trim(), password);
    setSubmitting(false);
    if (res.success) {
      navigate('/portal');
    } else {
      setError(res.message || 'Invalid username/email or password.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        boxSizing: 'border-box',
        backgroundColor: '#0f172a',
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(30, 58, 138, 0.45) 0%, transparent 40%),
          radial-gradient(circle at 85% 15%, rgba(245, 158, 11, 0.22) 0%, transparent 35%),
          radial-gradient(circle at 50% 85%, rgba(37, 99, 235, 0.3) 0%, transparent 45%),
          radial-gradient(circle at 80% 80%, rgba(13, 148, 136, 0.25) 0%, transparent 40%)
        `,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1180px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}
      >
        <div style={{ color: '#ffffff', padding: '10px 14px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '6px 14px', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#fbbf24', marginBottom: '20px' }}>
            
            <span>ZENSHOOL ENTERPRISE CLOUD PLATFORM</span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 16px', letterSpacing: '-0.5px' }}>
            Next-Gen Digital Campus <br />
            <span style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Management & Administration
            </span>
          </h1>

          <p style={{ fontSize: '1.02rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 24px', maxWidth: '520px' }}>
            A unified, multi-tenant school operating system designed for Super Admins, Campus Administrators, Finance Desks, Faculty, and Parents.
          </p>

          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              marginBottom: '26px',
              maxHeight: '260px'
            }}
          >
            <img
              src="/images/south_indian_students.png"
              alt="Campus Students"
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.92)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%)'
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.92rem' }}>Tamil Nadu Educational Network</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.76rem' }}>Automated SIS, Fees, Attendance & Exams</div>
              </div>
              <span style={{ background: 'rgba(255,255,255,0.18)', color: '#ffffff', padding: '4px 10px', borderRadius: '12px', fontSize: '0.74rem', fontWeight: 700 }}>
                Live Cloud Sync &bull; 99.9%
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '12px 14px' }}>
              <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                 Multi-Campus Security
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '3px' }}>
                Strict data isolation per school
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '12px 14px' }}>
              <div style={{ color: '#34d399', fontWeight: 800, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                 Live Fee Management
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '3px' }}>
                Instant collection & due tracking
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '12px 14px' }}>
              <div style={{ color: '#fbbf24', fontWeight: 800, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                 Real-Time Analytics
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '3px' }}>
                Student & faculty performance
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '12px 14px' }}>
              <div style={{ color: '#f472b6', fontWeight: 800, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                 WhatsApp Gateway
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '3px' }}>
                Instant parent alert notifications
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                background: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                padding: '24px 24px 16px',
                textAlign: 'center'
              }}
            >
              <img
                src="/images/zenschool_logo.png"
                alt="ZenSkool Logo"
                style={{
                  height: '75px',
                  maxWidth: '240px',
                  width: 'auto',
                  objectFit: 'contain',
                  margin: '0 auto 8px',
                  display: 'block'
                }}
              />
              <div style={{ fontSize: '0.84rem', color: '#64748b', fontWeight: 600 }}>
                Enterprise Campus Portal Login
              </div>
            </div>

            <div style={{ padding: '20px 24px 24px' }}>
              {error && (
                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#b91c1c',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  
                  <span>{error}</span>
                </div>
              )}

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px dashed #cbd5e1',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '18px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    One-Click Demo Role Presets:
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Auto-fill & Login</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {Object.entries(demoCredentials).map(([key, cred]) => {
                    const isActive = activePreset === key;
                    const isDeactivated = cred.schoolId && cred.schoolId !== 'ALL' && !isSchoolActive(cred.schoolId);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleFillDemo(key)}
                        style={{
                          background: isActive ? cred.color : (isDeactivated ? '#f8fafc' : '#ffffff'),
                          color: isActive ? '#ffffff' : (isDeactivated ? '#94a3b8' : '#334155'),
                          border: `1px solid ${isActive ? cred.color : (isDeactivated ? '#fca5a5' : '#e2e8f0')}`,
                          padding: '4px 10px',
                          borderRadius: '16px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          opacity: isDeactivated ? 0.75 : 1,
                          boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.15)' : 'none'
                        }}
                        title={isDeactivated ? `${cred.label} - Campus is currently DEACTIVATED by Super Admin` : cred.badge}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isActive ? '#ffffff' : (isDeactivated ? '#ef4444' : cred.color), display: 'inline-block' }}></span>
                        <span>{cred.label}</span>
                        {isDeactivated && (
                          <span style={{ fontSize: '0.62rem', background: '#fee2e2', color: '#dc2626', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>
                            OFFLINE
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '14px' }}>
                  <label
                    htmlFor="username"
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '6px'
                    }}
                  >
                    Email / User ID
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      id="username"
                      placeholder="e.g. superadmin@zenschool.com"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setActivePreset('');
                      }}
                      required
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        background: '#ffffff',
                        color: '#0f172a'
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label
                    htmlFor="password"
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '6px'
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setActivePreset('');
                      }}
                      required
                      style={{
                        width: '100%',
                        padding: '11px 56px 11px 14px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        background: '#ffffff',
                        color: '#0f172a'
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#2563eb',
                        padding: '4px 6px'
                      }}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(30, 58, 138, 0.35)',
                    transition: 'all 0.2s ease',
                    letterSpacing: '0.3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {submitting ? (
                    <>
                      <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></span>
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <span>Log In to Portal &rarr;</span>
                  )}
                </button>

                <Link
                  to="/"
                  style={{
                    width: '100%',
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '12px',
                    textDecoration: 'none',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#475569',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    boxSizing: 'border-box',
                    transition: 'all 0.15s ease'
                  }}
                >
                  ← Return to Home Page
                </Link>
              </form>

              <div
                style={{
                  marginTop: '18px',
                  paddingTop: '14px',
                  borderTop: '1px solid #f1f5f9',
                  textAlign: 'center',
                  fontSize: '0.72rem',
                  color: '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                
                <span>256-Bit SSL Encrypted &bull; Multi-Campus Session Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
