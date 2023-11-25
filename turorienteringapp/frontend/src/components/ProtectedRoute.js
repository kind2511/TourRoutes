import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

// A utility component that wraps around <Route> to make it "protected".
// If a user is not authenticated, they're redirected to the login page.
function ProtectedRoute(props) {
    // Grab the token from the AuthContext using useAuth.
    const { token } = useAuth();

    // If there's no authenticated token, navigate to the login page.
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If there is an authenticated token, render the desired route.
    return <Route {...props} />;
}

export default ProtectedRoute;
