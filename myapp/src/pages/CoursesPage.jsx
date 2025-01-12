import React from 'react';
import './CoursesPage.css';

const CoursesPage = () => {
  return (
    <div className="courses-page">
      <h1>Courses Offered</h1>
      <p>Enhance your skills with our wide range of professional courses designed to help you succeed in the tech industry.</p>

      <div className="course-list">
        <div className="course-item">
          <h3>AI & Machine Learning</h3>
          <p><strong>Duration:</strong> 3 months</p>
          <p><strong>Mode:</strong> Online</p>
          <p><strong>Description:</strong> Learn the fundamentals of AI and ML. This course covers algorithms, model development, and applications in real-world scenarios.</p>
        </div>

        <div className="course-item">
          <h3>Web Development with MERN Stack</h3>
          <p><strong>Duration:</strong> 2 months</p>
          <p><strong>Mode:</strong> Online</p>
          <p><strong>Description:</strong> Master the MERN stack (MongoDB, Express.js, React, Node.js) and build dynamic web applications from scratch.</p>
        </div>

        <div className="course-item">
          <h3>Data Science & Big Data</h3>
          <p><strong>Duration:</strong> 4 months</p>
          <p><strong>Mode:</strong> Online</p>
          <p><strong>Description:</strong> A deep dive into data science with a focus on large-scale data processing, machine learning, and data visualization techniques.</p>
        </div>

        <div className="course-item">
          <h3>Cloud Computing with AWS</h3>
          <p><strong>Duration:</strong> 2 months</p>
          <p><strong>Mode:</strong> Online</p>
          <p><strong>Description:</strong> Learn cloud services on AWS and gain hands-on experience with AWS EC2, S3, Lambda, and more.</p>
        </div>
      </div>

      <div className="enroll-now">
        <h3>How to Enroll?</h3>
        <p>Click below to enroll in any of the courses.</p>
        <a href="/enroll" className="btn btn-primary">Enroll Now</a>
      </div>
    </div>
  );
};

export default CoursesPage;