import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    /* Initializing the navigate function for navigation purposes */
    const navigate = useNavigate();

    /* Navigate to the UserProfile page */
    const handleProfile = () => {
        navigate('/profile');
    }

    /* Redirect the user to the login page after logging out */
    const handleLogout = () => {
        navigate('/login'); 
    }

    /* Navigate to the About Us page */
    const handleAboutUs = () => {
        navigate('/about');
    }

    return (
        <div className="dashboard-container">
            {/* Navigation bar options for the dashboard */}
            <div className="navigation-options">
                <span className="option-item" onClick={handleProfile}>My Profile</span>
                <span className="option-item" onClick={handleAboutUs}>About Us</span>
                {/* Placeholder for the Routes option - future implementation */}
                <span className="option-item" onClick={() => { /* Future implementation for routes navigation */ }}>Routes</span>
                <span className="option-item" onClick={handleLogout}>Logout</span>
            </div>
            {/* Placeholder for the main content of the dashboard (e.g., map view) */}
            <div className="map-placeholder"></div>
        </div>
    );
}

export default Dashboard;
