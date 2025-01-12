import React from 'react';
import './InternshipPage.css';

const InternshipPage = () => {
  return (
    <div className="internship-page">
      <h1>Internship Opportunities</h1>
      <p>Explore exciting internship opportunities with us. Gain hands-on experience and develop skills that will shape your career.</p>
      
      <div className="internship-list">
        <div className="internship-item">
          <h3>AI & Machine Learning Intern</h3>
          <p><strong>Location:</strong> Remote</p>
          <p><strong>Duration:</strong> 6 months</p>
          <p><strong>Requirements:</strong> Basic knowledge of Python, ML algorithms, and data science concepts.</p>
        </div>

        <div className="internship-item">
          <h3>Software Development Intern</h3>
          <p><strong>Location:</strong> On-site (Bangalore)</p>
          <p><strong>Duration:</strong> 3 months</p>
          <p><strong>Requirements:</strong> Proficiency in JavaScript, React, and Node.js.</p>
        </div>

        <div className="internship-item">
          <h3>Data Science Intern</h3>
          <p><strong>Location:</strong> Remote</p>
          <p><strong>Duration:</strong> 6 months</p>
          <p><strong>Requirements:</strong> Knowledge of statistical analysis, Python (Pandas, Numpy), and machine learning.</p>
        </div>
      </div>
      
      <div className="apply-now">
        <h3>How to Apply?</h3>
        <p>Click on the link below to submit your application.</p>
        <a href="/apply" className="btn btn-primary">Apply Now</a>
      </div>
    </div>
  );
};

export default InternshipPage;