// Import React library for creating the UI components
import React from 'react';

// Import necessary components from the React Router library for handling navigation
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import the SignIn and Register pages to be rendered for specific routes
import SignIn from './pages/SignIn';
import Register from './pages/Register';

// Main App function component
function App() {
  return (
    // Surrounding div with a class name "App"
    <div className="App">
      
      {/* Router component to provide routing capabilities */}
      <Router>
        
        {/* Routes component to define all possible paths */}
        <Routes>
          
          {/* Default route that redirects to the "/login" page */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Route for the login page, rendering the SignIn component */}
          <Route path="/login" element={<SignIn />} />
          
          {/* Route for the registration page, rendering the Register component */}
          <Route path="/register" element={<Register />} />
          
          {/* Placeholder comment to indicate where additional routes can be added */}
          {/* Add other routes here as needed */}
          
        </Routes>
      </Router>
    </div>
  );
}

// Export the App component to be used elsewhere in the project
export default App;
