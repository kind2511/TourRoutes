// Importing necessary libraries and components
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';  // Importing the AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Importing the ProtectedRoute

// Pages
import SignIn from './pages/SignIn';
import Register from './pages/Register';

// Components
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import UserProfile from './components/UserProfile';
import NewRoute from './components/NewRoute';
import PublishedRoutes from './components/PublishedRoutes';
import FindPath from './components/FindPath';
import LogOut from './components/LogOut';
import DeleteUser from './components/DeleteUser';
import GoodbyePage from './components/GoodbyePage';
import MyRoutes from './components/MyRoutes';
import Admin from './components/Admin';
import Welcome from './components/Welcome';

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

                        {/* User Dashboard - Protected */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />

                        {/* LogOut Route */}
                        <Route path="/logout" element={<LogOut />} />

                        {/* About Us Page */}
                        <Route path="/about" element={<AboutUs />} />

                        {/* User Profile Page - Protected */}
                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <UserProfile />
                            </ProtectedRoute>
                        } />

                        {/* Page to Delete a User - Protected */}
                        <Route path="/delete-user" element={
                            <ProtectedRoute>
                                <DeleteUser />
                            </ProtectedRoute>
                        } />

                        <Route path="/goodbye" element={<GoodbyePage />} />

                        {/* Page to Create a New Route - Protected */}
                        <Route path="/new-route" element={
                            <ProtectedRoute>
                                <NewRoute />
                            </ProtectedRoute>
                        } />

                        {/* My Routes Page - Protected */}
                        <Route path="/my-routes" element={
                            <ProtectedRoute>
                                <MyRoutes />
                            </ProtectedRoute>
                        } />

                        {/* Page to view all saved routes */}
                        <Route path="/published-routes" element={<PublishedRoutes />} />

                        {/* Page to find a path */}
                        <Route path="/find-path" element={<FindPath />} />

                        {/* Page to Admin - Protected */}
                        <Route path="/admin" element={
                            <ProtectedRoute>
                                <Admin />
                            </ProtectedRoute>
                        } />

                        {/*Page to Welcome */}
                        <Route path="/welcome" element={<Welcome />} />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

// Exporting the App component so it can be used in other parts of the application
export default App;
