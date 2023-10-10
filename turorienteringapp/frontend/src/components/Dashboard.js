import React from 'react';
import { useNavigate } from 'react-router-dom'; /* Importing useNavigate*/
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    {/* Log out and redirect ot login page after */}
    const handleLogout = () => {
        navigate('/login'); 
    }

    return (
        <div className="dashboard-container">
            {/* Dashboard component's content goes here */}
            <h2>Coming soon :)</h2>
            {/* Button to log out */}
            <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Apply the class here */}
        </div>
    );
}

export default Dashboard;
