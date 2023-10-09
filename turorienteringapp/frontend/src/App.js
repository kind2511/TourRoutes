import React from 'react';
// Import necessary components from the React Router library for handling navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import the SignIn, Register pages, and HomePage
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import HomePage from './components/HomePage';  // importing the HomePage component
import Dashboard from './components/Dashboard';

// Main App function component
function App() {
    return (
        <div className="App">
            <Router>
                {/* Removed the NavigationBar component */}
                <Routes>
                    {/* Route for the HomePage */}
                    <Route path="/" element={<HomePage />} />
                    
                    {/* Route for the login page */}
                    <Route path="/login" element={<SignIn />} />
                    
                    {/* Route for the registration page */}
                    <Route path="/register" element={<Register />} />

                    {/*Route for the Dashboard_ Router will render the dashboard */}
                    <Route path="Dashboard" element={<Dashboard/>} />
                    
                    {/* Add other routes here as needed */}
                </Routes>
            </Router>
        </div>
    );
}

/* Export the App component to be used elsewhere in the project */
export default App;
