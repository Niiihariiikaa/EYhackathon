import React, { createContext, useState, useContext } from 'react';

// Create the Auth context
const AuthContext = createContext();

// Create the Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state (user not logged in)

  // Function to log in the user (this can be adjusted to your authentication logic)
  const login = (userData) => {
    setUser(userData); // Set the logged-in user
  };

  // Function to log out the user
  const logout = () => {
    setUser(null); // Clear the user data
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook to consume the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
