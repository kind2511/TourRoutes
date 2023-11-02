import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(); // Creating the authentication context

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // State to hold user data

    const signIn = (userData) => {
        // Set user data after signIn
        setUser(userData);
    }

    const signOut = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');
        // Reset user state
        setUser(null);
    }

    const register = (userData) => {
        // Set user data upon successful registration
        setUser(userData);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, register }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);  // Using the created context
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');  // Error handling for improper context usage
    }
    return context;
}

export { AuthProvider, useAuth }; // Exporting the provider and the hook
