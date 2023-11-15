// Importing necessary libraries and components
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';  // Importing the AuthProvider

// Pages
import SignIn from './pages/SignIn';
import Register from './pages/Register';

// Components
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import UserProfile from './components/UserProfile';
import NewRoute from './components/NewRoute';
import AllRoutes from './components/AllRoutes';
import FindPath from './components/FindPath';
import LogOut from './components/LogOut';
import DeleteUser from './components/DeleteUser';
import GoodbyePage from './components/GoodbyePage';
import MyRoutes from './components/MyRoutes';
import Admin from './components/Admin';


// Main App component
function App() {
    return (
        <AuthProvider> {/* Wrapping the entire app with AuthProvider */}
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

                        {/* LogOut Route */}
                        <Route path="/logout" element={<LogOut />} />

                        {/* About Us Page */}
                        <Route path="/about" element={<AboutUs />} />

                        {/* User Profile Page */}
                        <Route path="/profile" element={<UserProfile />} />

                        {/* Page to delete a user */}
                        <Route path="/delete-user" element={<DeleteUser />} />

                        <Route path="/goodbye" element={<GoodbyePage />} />

                        {/* Page to create a new route */}
                        <Route path="/new-route" element={<NewRoute />} />

                        <Route path="/my-routes" element={<MyRoutes />} />


                        {/* Page to view all saved routes */}
                        <Route path="/all-routes" element={<AllRoutes />} />

                        {/* Page to find a path */}
                        <Route path="/find-path" element={<FindPath />} />

                        {/* Page to Admin*/}
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

// Exporting the App component so it can be used in other parts of the application
export default App;