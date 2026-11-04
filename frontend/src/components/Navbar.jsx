import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header public-header">
      <div className="container nav-container">
        {/* Left: Responsive Brand Logo */}
        <Link to="/" className="logo" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/zenschool_logo.png"
            alt="ZenSkool Logo"
            className="navbar-logo-img"
          />
        </Link>

        {/* Center: Slide-out Navigation Drawer */}
        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-drawer-header">
            <span className="drawer-title">ZenSkooll Menu</span>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={closeMenu}
              aria-label="Close Navigation Menu"
            >
              &times;
            </button>
          </div>

          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Features
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Pricing
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact Us
          </NavLink>

          {user ? (
            <NavLink to="/portal" className="nav-link mobile-portal-login" onClick={closeMenu}>
              Open Portal ({user.role})
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav-link mobile-portal-login" onClick={closeMenu}>
              Portal Login
            </NavLink>
          )}
        </nav>

        {/* Right side cluster: Portal button (desktop only) + Hamburger Menu (mobile only) */}
        <div className="nav-right-cluster">
          <div className="nav-actions desktop-only-actions">
            {user ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-primary nav-portal-btn"
                  onClick={() => {
                    closeMenu();
                    navigate('/portal');
                  }}
                >
                  Portal
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    closeMenu();
                    logout();
                    navigate('/');
                  }}
                  style={{ padding: '7px 12px', fontSize: '0.8rem' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary nav-portal-btn" onClick={closeMenu}>
                Portal Login
              </Link>
            )}
          </div>

          <button
            type="button"
            className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Dimmed backdrop when mobile drawer is open */}
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={closeMenu}></div>
      )}
    </header>
  );
}
