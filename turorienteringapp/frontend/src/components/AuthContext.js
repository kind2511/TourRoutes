import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the authentication state
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // State to keep track of the user's information
  const [user, setUser] = useState(null);

  // Effect to load the user from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.email) {
          setUser({ ...parsedUser, token: storedToken });
        } else {
          throw new Error('Invalid user data');
        }
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  // Function to handle user sign-in
  const signIn = (userData, token) => {
    return new Promise((resolve) => {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser({ ...userData, token });
      resolve();
    });
  };

  // Function to handle user sign-out
  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // Context value that will be provided to consumers
  const value = { user, signIn, signOut };

  // Provide auth context to all children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// access auth in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
