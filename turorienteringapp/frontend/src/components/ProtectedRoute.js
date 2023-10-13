import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from './AuthContext';  // Import the authentication context

// A utility component that wraps around <Route> to make it "protected".
// If a user is not authenticated, they're redirected to the login page.
function ProtectedRoute(props) {
    // Grab the user from the AuthContext.
    const { user } = React.useContext(AuthContext);

    // If there's no authenticated user, navigate to the login page.
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If there is an authenticated user, render the desired route.
    return <Route {...props} />;
}

export default ProtectedRoute;
