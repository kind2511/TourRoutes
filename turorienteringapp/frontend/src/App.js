import React from 'react';
// Import necessary components from the React Router library for handling navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import the SignIn, Register pages, HomePage, Dashboard, and AboutUs components
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';  // <-- Imported the AboutUs component

// Main App function component
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Route for the HomePage */}
                    <Route path="/" element={<HomePage />} />
                    {/* Route for the login page */}
                    <Route path="/login" element={<SignIn />} />
                    {/* Route for the registration page */}
                    <Route path="/register" element={<Register />} />
                    {/* Route for the Dashboard */}
                    <Route path="/dashboard" element={<Dashboard/>} />
                    {/* Route for the About Us page */}
                    <Route path="/about" element={<AboutUs />} />  
                </Routes>
            </Router>
        </div>
    );
}

/*Export the App component to be used elsewhere in the project*/
export default App;
