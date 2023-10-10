import React from 'react';
import { useNavigate } from 'react-router-dom'; /* Importing useNavigate*/
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
{/* Log out and redirect to login page after */}
    const handleLogout = () => {
        navigate('/login'); 
    }


    return (
        <div className="dashboard-container">
            <div className="navigation-options">
                <span className="option-item" onClick={() => { /* Handle profile click */ }}>My Profile</span>
                <span className="option-item" onClick={() => { /* Handle about us click */ }}>About Us</span>
                <span className="option-item" onClick={() => { /* Handle routes click */ }}>Routes</span>
                <span className="option-item" onClick={handleLogout}>Logout</span>
            </div>
            <div className="map-placeholder"></div> {/* New map container */}
        </div>
    );
}

export default Dashboard;
