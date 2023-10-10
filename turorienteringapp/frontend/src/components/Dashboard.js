import React from 'react';
import { useNavigate } from 'react-router-dom'; /* Importing useNavigate */
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    {/* Log out and redirect to login page after */}
    const handleLogout = () => {
        navigate('/login'); 
    }

    return (
        <div className="dashboard-container">
            {/* Dashboard component's content goes here */}
            <h2>Coming soon :)</h2>
            {/* Clickable text for logging out */}
            <span className="logout-text" onClick={handleLogout}>Logout</span> {/* Using span with className for the clickable text */}
        </div>
    );
}

export default Dashboard;
