import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import VoiceAssistant from './VoiceAssistant'; // Import the correct path

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This will render the content of the current route */}
      </main>

      {/* Floating Voice Assistant Button */}
      <div className="top-right-icons">
        <VoiceAssistant /> {/* Show the voice assistant across all pages */}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
