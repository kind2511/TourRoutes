import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import mapboxgl from 'mapbox-gl';

// Our access tokens
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

const Dashboard = () => {
    const mapContainerRef = useRef(null);
    const navigate = useNavigate();

    const [activeReviewIndex, setActiveReviewIndex] = useState(0);
    const reviews = [
        "Discover the quickest routes for your daily hikes",
        "Navigate to the shortest roads for your school or workplace commute",
        "Explore our map and uncover hidden trails and shortcuts",
        "Join our community and share your favorite routes with others",
        "Adjust your settings to avoid traffic jams and save time",
        "Bookmark locations and plan your trips efficiently",
        "Experience seamless navigation with our real-time updates",
        "Personalize your map view to suit your preferences"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 3000); // Changes review every 3 seconds

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [10.797379, 60.794533],
            zoom: 9
        });

        return () => {
            map.remove();
            clearInterval(interval);
        };
    }, []);

    const handleProfile = () => {
        navigate('/profile');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
    }

    const handleAboutUs = () => {
        navigate('/about');
    }

    return (
        <div className="dashboard-container">
            <div className="navigation-options">
                <span className="option-item" onClick={handleProfile}>My Profile</span>
                <span className="option-item" onClick={handleAboutUs}>About Us</span>
                {/* Routes dropdown integration */}
                <div className="edit-dropdown">
                    <span className="option-item">Routes</span>
                    <div className="edit-dropdown-content">
                        <a href="#" onClick={() => { /* Logic for Create new route */ }}>New Route</a>
                        <a href="#" onClick={() => { /* Logic for My routes */ }}>My Routes </a>
                        <a href="#" onClick={() => { /* Logic for All routes */ }}>All Routes</a>
                    </div>
                </div>

                <span className="option-item" onClick={handleLogout}>Logout</span>
            </div>
            <div className="map-placeholder" ref={mapContainerRef}></div>
            <div className="review-panel">
                {reviews[activeReviewIndex]}
            </div>
        </div>
    );
}

export default Dashboard;