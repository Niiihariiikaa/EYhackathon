import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="navbar-brand">
        <Link to="/" className="text-xl font-bold">
        <img src="Proxima Nova (1).png" alt="ClaimSync Logo" className="logo" style={{ height: '60px', marginRight: '-7px' , marginBottom:'-25px' }} />
        {!isCollapsed && 'ClaimSync'} 
        </Link>
        
        <button
          className="navbar-toggler"
          onClick={handleToggle}
        >
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>

      <ul className="nav-items">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/features">
            <span className="nav-icon">📞</span>
            <span className="nav-text">Callback Scheduling</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/careers">
            <span className="nav-icon">📊</span>
            <span className="nav-text">Sentiment Analysis</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">
            <span className="nav-icon">📈</span>
            <span className="nav-text">Claim Forecasting</span>
          </Link>
        </li>
        <li className="nav-item">
              <Link className="nav-link" to="/internship-courses">
              <span className='nav-icon'>🎓</span>
              <span className='nav-text'> Internships & Courses </span>
              </Link> {/* New Link */}
            </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <span className="nav-icon">🎯</span>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;