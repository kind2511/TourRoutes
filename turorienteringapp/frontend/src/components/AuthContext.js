import React, { createContext, useState } from 'react';

// Create a new Context for authentication.
// This will allow child components to access authentication-related data and methods.
export const AuthContext = createContext();

// A provider component that wraps children components and provides them access
// to the authentication context.
export const AuthProvider = ({ children }) => {
    // Local state to keep track of the authenticated user.
    // 'user' will be null if no user is authenticated.
    const [user, setUser] = useState(null);

    // Provide the 'user' state and 'setUser' method to children.
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
