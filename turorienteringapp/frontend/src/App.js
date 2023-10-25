// Importing necessary libraries and components
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';  
import UserProfile from './components/UserProfile';  
import NewRoute from './components/NewRoute';
import MyRoutes from './components/MyRoutes';

// Main App component
function App() {
    return (
        <div className="App">
            {/* Initializing the router */}
            <Router>
                {/* Setting up the routes for navigation */}
                <Routes>
                    {/* Home Page */}
                    <Route path="/" element={<HomePage />} />
                    
                    {/* Login Page */}
                    <Route path="/login" element={<SignIn />} />
                    
                    {/* Registration Page */}
                    <Route path="/register" element={<Register />} />
                    
                    {/* User Dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                    {/* About Us Page */}
                    <Route path="/about" element={<AboutUs />} />
                    
                    {/* User Profile Page */}
                    <Route path="/profile" element={<UserProfile />} />
                                       
                    {/* Page to create a new route */}
                    <Route path="/new-route" element={<NewRoute />} />

                    {/* Route to view user's saved routes */}
                    <Route path="/my-routes" element={<MyRoutes />} />
                </Routes>
            </Router>
        </div>
    );
}

// Exporting the App component so it can be used in other parts of the application
export default App;
