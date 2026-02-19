import React from 'react';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const isDemoMode = !process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL.includes('your-backend-url');
  
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <h1 className="logo">NETFLIX</h1>
        </div>
        <div className="navbar-right">
          {user || isDemoMode ? (
            <div className="user-info">
              <span className="welcome-text">
                Welcome, {user?.username || 'Demo User'}
              </span>
              {user && (
                <button className="logout-btn" onClick={onLogout}>
                  Logout
                </button>
              )}
              {isDemoMode && !user && (
                <span className="demo-badge">DEMO</span>
              )}
            </div>
          ) : (
            <>
              <button className="search-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="user-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
