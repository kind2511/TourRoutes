import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// This component is used to restrict access to certain rotues.
function ProtectedRoute({ children }) {
    const { token, loading } = useAuth();

    // Show a loading message while the app check if the user is logged in
    if (loading) {
        return <div>Loading...</div>;
    }

    // If the user is not logged in (no token), redirect them to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If the user is logged in (yes token), show the component that this route is supposed to render.
    return children;
}

export default ProtectedRoute;
