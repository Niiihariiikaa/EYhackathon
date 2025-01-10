import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get user from context

  if (!user) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/" />;
  }

  return children; // If authenticated, render the children components
};

export default ProtectedRoute;
