// src/App.js

import React from 'react';
// Import necessary components from the React Router library for handling navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import the SignIn, Register pages, HomePage, and NavigationBar
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import NavigationBar from './components/NavigationBar';
import HomePage from './components/HomePage';  // importing the HomePage component

// Main App function component
function App() {
    return (
        <div className="App">
            <Router>
                <NavigationBar /> {/* display the navigation bar on every page */}
                <Routes>
                    {/* Route for the HomePage */}
                    <Route path="/" element={<HomePage />} />
                    
                    {/* Route for the login page */}
                    <Route path="/login" element={<SignIn />} />
                    
                    {/* Route for the registration page */}
                    <Route path="/register" element={<Register />} />
                    
                    {/* Add other routes here as needed */}
                </Routes>
            </Router>
        </div>
    );
}

/* Export the App component to be used elsewhere in the project*/
export default App;
