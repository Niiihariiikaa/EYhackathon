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
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">ClaimSync</Link>
        </div>

        {/* Hamburger Icon (Visible when collapsed) */}
        <button className="navbar-toggler" onClick={handleToggle}>
          <div className="navbar-toggler-icon"></div>
        </button>

        {/* Navbar items */}
        <ul className="nav-items">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/features">Callback Scheduling</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/careers">Sentiment Analysis</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Claim Forecasting</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
