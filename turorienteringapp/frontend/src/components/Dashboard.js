import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
// Mapbox GL JS library import
import mapboxgl from 'mapbox-gl';

// Our access tokens
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';  

/*function for component Dashboard*/
const Dashboard = () => {

    /*create ref to dom element, to where should render the map in the container in the dashboard*/
    const mapContainerRef = useRef(null);  

    /* create navigation function to navigate between routes in dashboard page*/
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

    // Mapbox map initialization
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,// ref to container in dashboard where should be show
            style: 'mapbox://styles/mapbox/streets-v11',// style map
            center: [10.797379, 60.794533],  // Initial position set to Gjøvik, Norway.
            zoom: 9 //zoom level
        });

        // Cleanup on component unmount--> clean it after use
        return () => map.remove();
    }, []);

    // JSX return for the Dashboard component
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
            <div className="map-placeholder" ref={mapContainerRef}></div>  {/* Adding reference for Mapbox */}
        </div>
    );
}

export default Dashboard;
