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
    const [activePopupReviewIndex, setActivePopupReviewIndex] = useState(0);
    const [showSlide, setShowSlide] = useState(false);  // State for slide-in animation

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

    const popupReviews = [
        "Great route! Saved me 10 minutes.",
        "The trail was scenic and easy to follow.",
        "Needs better indications at junctions.",
        // ... ...... etc
    ];

    useEffect(() => {
        const reviewInterval = setInterval(() => {
            setActiveReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 3000);

        const popupReviewInterval = setInterval(() => {
            setActivePopupReviewIndex((prevIndex) => (prevIndex + 1) % popupReviews.length);
            setShowSlide(true);  // Start the slide animation
            setTimeout(() => setShowSlide(false), 4900);  // End the slide animation just before the next cycle
        }, 5000);

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [10.797379, 60.794533],
            zoom: 9
        });

        return () => {
            map.remove();
            clearInterval(reviewInterval);
            clearInterval(popupReviewInterval);
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
                <div className="edit-dropdown">
                    <span className="option-item">Routes</span>
                    <div className="edit-dropdown-content">
                        <a href="#" onClick={() => { }}>New Route</a>
                        <a href="#" onClick={() => { }}>My Routes </a>
                        <a href="#" onClick={() => { }}>All Routes</a>
                    </div>
                </div>
                <span className="option-item" onClick={handleLogout}>Logout</span>
            </div>
            <div className="map-placeholder" ref={mapContainerRef}></div>
            <div className={`popup-review-panel ${showSlide ? 'slide-in' : ''}`}>
                {popupReviews[activePopupReviewIndex]}
            </div>
            <div className="review-panel">
                {reviews[activeReviewIndex]}
            </div>
        </div>
    );
}

export default Dashboard;
