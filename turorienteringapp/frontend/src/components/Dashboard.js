import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import mapboxgl from 'mapbox-gl';

// Our access tokens
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

/*
 * Initializes a reference for the map container's DOM element using useRef.
 * Utilizes React Router's useNavigate for programmatic navigation.
 * Sets up a reference to hold the Mapbox GL map instance with useRef.
 * Declares state using useState for tracking the active review index.
 * Declares state with useState to keep track of the active index for popup reviews.
 * Handles the slide-in animation state.
 * Establishes a state for managing
 */
const Dashboard = () => {
    const mapContainerRef = useRef(null);// where should be rendred 
    const navigate = useNavigate();
    const mapRef = useRef(null); // Reference to the Mapbox GL map instance_where to store

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


    /*
     * Cycles through reviews every 3 seconds.
     * Cycles through popup reviews every 5 seconds with slide animation.
     */
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
            style: 'mapbox://styles/mapbox/satellite-streets-v11',
            center: [10.797379, 60.794533],
            zoom: 9
        });

        // Store the map instance in the ref
        mapRef.current = map;

        // Add a click event listener to create markers
        map.on('click', handleMapClick);

        return () => {
            map.remove();
            clearInterval(reviewInterval);
            clearInterval(popupReviewInterval);
        };
    }, []);

    const handleMapClick = (e) => {
        const { lng, lat } = e.lngLat;
        // Create a marker at the clicked coordinates
        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
   
    return (
        <div className="dashboard-container">
            <div className="navigation-options">
                <span className="option-item" onClick={handleProfile}>My Profile</span>
                <div className="edit-dropdown">
                    <span className="option-item">Routes</span>
                    <div className="edit-dropdown-content">
                        <a href="#" onClick={() => navigate('/new-route')}>New Route</a>
                        <a href="#" onClick={() => {/* navigate to My Routes */}}>My Routes</a>
                        <a href="#" onClick={() => {/* navigate to All Routes */}}>All Routes</a>
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
