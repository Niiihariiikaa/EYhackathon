import React, { useState } from 'react';
import InternshipPage from './InternshipPage';
import CoursesPage from './CoursesPage';
import './InternshipCoursesTogglePage.css';

const InternshipCoursesTogglePage = () => {
  const [showInternship, setShowInternship] = useState(true);

  const togglePage = () => {
    setShowInternship(!showInternship);
  };

  return (
    <div className="internship-courses-container">
      <div className="page-header">
        <h1>Internships & Courses</h1>
        <p className="page-description">Explore opportunities to kickstart your career with hands-on internships or upskill through our diverse courses.</p>
      </div>

      <div className="toggle-buttons-container">
        <button
          className={`toggle-btn ${showInternship ? 'active' : ''}`}
          onClick={() => setShowInternship(true)}
        >
          <span className="toggle-btn-text">Internships</span>
        </button>
        <button
          className={`toggle-btn ${!showInternship ? 'active' : ''}`}
          onClick={() => setShowInternship(false)}
        >
          <span className="toggle-btn-text">Courses</span>
        </button>
      </div>

      <div className="content-section">
        {showInternship ? <InternshipPage /> : <CoursesPage />}
      </div>
    </div>
  );
};

export default InternshipCoursesTogglePage;
