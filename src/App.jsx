import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AutomatedCallback from './pages/AutomatedCallback'; // Correct import name
import ClientSentiment from './pages/ClientSentiment'; // Correct import name
import FraudDetection from './pages/FraudDetection'; // Correct import name
import './App.css'; 
import Chatbot from './components/Chatbot';
import { FaUserCircle, FaMicrophoneAlt } from 'react-icons/fa'; // Updated icon for microphone
import ClaimForecasting from './pages/ClaimForecasting';
const App = () => {

  const handleVoiceAssistant = () => {
    console.log('Voice assistant activated');
    // Implement voice assistant logic here (e.g., Web Speech API or third-party service)
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<AutomatedCallback />} />
            <Route path="/careers" element={<ClientSentiment />} />
            
            <Route path="/contact" element={<ClaimForecasting />} />
          </Routes>
        </main>

        {/* Top Right Icon Container */}
        <div className="top-right-icons">
          <FaUserCircle className="user-icon" size={40} />
          <div className="voice-assistant-container">
            <button onClick={handleVoiceAssistant} className="voice-assistant-btn">
              <FaMicrophoneAlt size={30} />
            </button>
            <span className="voice-assistant-label">Voice Assistant</span>
          </div>
        </div>
        
        <Footer />
        <Chatbot/>
      </div>
    </Router>
  );
};

export default App;
