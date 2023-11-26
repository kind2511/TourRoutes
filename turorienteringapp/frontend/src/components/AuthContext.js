import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the authentication state
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  // State to keep track of the authentication token
  const [token, setToken] = useState(null);

  // Adding a state to manage the loading status
  const [loading, setLoading] = useState(true);

  //---------------------------------------------------->

  // Effect to load the token from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // Setting token if it's found in localStorage
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Failed to parse token from localStorage:', error);
      localStorage.removeItem('token');
      setToken(null);
    }
    setLoading(false); // Setting loading to false after attempting to load token
  }, []);

  //----------------------------------------------------->

  // Function to handle sign-in
  const signIn = (newToken) => {
    // Set the token in the state and local storage
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  //----------------------------------------------------->

  // Function to handle sign-out
  const signOut = () => {
    setToken(null);
    localStorage.clear();
    localStorage.removeItem('lastSuccess');
    localStorage.removeItem('tokenU');
  };

  //----------------------------------------------------->

  // Context value that will be provided to consumers
  const value = { token, signIn, signOut, loading };

  // Provide auth context to all children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to access auth in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;


