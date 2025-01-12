import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AutomatedCallback from './pages/AutomatedCallback';
import ClientSentiment from './pages/ClientSentiment';
import FraudDetection from './pages/FraudDetection';
import './App.css';
import Chatbot from './components/Chatbot';
import { FaUserCircle, FaMicrophoneAlt } from 'react-icons/fa';
import ClaimForecasting from './pages/ClaimForecasting';
import Login from './pages/Login'; // Import the Login component
import './pages/Login.css'; // Import the Login CSS
import DashboardCard from './components/DashboardCard'; // Import DashboardCard component
import VoiceAssistant from './components/VoiceAssistant'; // Import VoiceAssistant
import InternshipCoursesTogglePage from './pages/InternshipCoursesTogglePage'; // Import the new page

// Create a helper component to manage location-based styles and logic
const LocationWrapper = ({ children, isLoggedIn }) => {
  const location = useLocation(); // Get the current location (route)

  useEffect(() => {
    if (location.pathname === "/login") {
      document.body.classList.add("login"); // Add 'login' class when on the login page
      document.querySelector("input")?.classList.add("login");
      document.querySelector("label")?.classList.add("login");
    } else {
      document.body.classList.remove("login"); // Remove 'login' class for other pages
      document.querySelectorAll("input").forEach((input) => input.classList.remove("login"));
      document.querySelectorAll("label").forEach((label) => label.classList.remove("login"));
    }
  }, [location]); // Runs whenever the location (route) changes

  return (
    <>
      {children}
      {/* Render Chatbot only if logged in and current route is not '/login' */}
      {isLoggedIn && location.pathname !== "/login" && <Chatbot />}
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVoiceAssistantVisible, setIsVoiceAssistantVisible] = useState(false); // State for VoiceAssistant visibility
  const [isUserMenuVisible, setUserMenuVisible] = useState(false);

  // This function is passed to Login.jsx to update the state when login is successful
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {/* Wrap the entire application in LocationWrapper */}
      <LocationWrapper isLoggedIn={isLoggedIn}>
        <div className="flex flex-col min-h-screen">
          {/* Navbar and main content are only shown if logged in */}
          {isLoggedIn && <Navbar />}

          <main className="flex-grow">
            <Routes>
              {/* Login page route */}
              <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLoginSuccess} />} />

              {/* Redirect to Home if logged in, else stay at login */}
              <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
              <Route path="/features" element={isLoggedIn ? <AutomatedCallback /> : <Navigate to="/login" />} />
              <Route path="/careers" element={isLoggedIn ? <ClientSentiment /> : <Navigate to="/login" />} />
              <Route path="/contact" element={isLoggedIn ? <ClaimForecasting /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={isLoggedIn ? <DashboardCard /> : <Navigate to="/login" />} />
              
              {/* New route for InternshipCoursesTogglePage */}
              <Route path="/internship-courses" element={isLoggedIn ? <InternshipCoursesTogglePage /> : <Navigate to="/login" />} />
            </Routes>
          </main>

          {/* Top Right Icon Container */}
          {isLoggedIn && (
            <div className="top-right-icons">
              {/* Game Icon (Using PNG Image) */}
              <div className="game-icon-container">
                <img src="src/assets/Proxima Nova.png" alt="Game Icon" className="game-icon"  />
                <span className="custom-tooltip"> CS Game Points: 5 <br /> No. of Games Played:2</span>
                <span className="game-number">5</span>
              </div>
                <div className="user-icon-wrapper">
                  <FaUserCircle
                    className="user-icon"
                    size={50}
                    onClick={() => setUserMenuVisible(!isUserMenuVisible)} // Toggle visibility
                  />
                  {isUserMenuVisible && (
                    <div className="user-info-dropdown">
                      <p className="user-name">Admin</p>
                      <p className="user-email"><b>Mail:</b> admin@gmail.com</p>
                      <p className="game-points"><b>Game Points:</b> 5</p>
                    </div>
                  )}
                </div>

              {/* Voice Assistant Icon */}
              <div className="voice-assistant-container">
                <button
                  className="voice-assistant-btn"
                  onClick={() => setIsVoiceAssistantVisible(!isVoiceAssistantVisible)} // Toggle visibility
                >
                  <FaMicrophoneAlt size={25} />
                </button>
                
              </div>
            </div>
          )}
          {/* Render VoiceAssistant if visible */}
          {isVoiceAssistantVisible && (
            <div className="voice-assistant-wrapper">
              <VoiceAssistant />
            </div>
          )}

          <Footer />
        </div>
      </LocationWrapper>
    </Router>
  );
};

export default App;
