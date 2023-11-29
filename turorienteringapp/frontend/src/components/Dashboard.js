import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import mapboxgl from 'mapbox-gl';
import { decodeToken } from './AuthUtils';

// Our access tokens
mapboxgl.accessToken = 'Ypk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

const Dashboard = () => {
    const navigate = useNavigate();
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [activeReviewIndex, setActiveReviewIndex] = useState(0);
    const [activePopupReviewIndex, setActivePopupReviewIndex] = useState(0);
    const [showSlide, setShowSlide] = useState(false);
    const token = localStorage.getItem('token'); //Retrive token from local storge
    const userRole = token ? decodeToken(token).role : null;//decode the token to get user role
    

    const reviews = [
        // Descriptive messages to guide users on the platform's features
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
        // User reviews or feedback about routes
        "Great route! Saved me 10 minutes.",
        "The trail was scenic and easy to follow.",
        "Needs better indications at junctions.",
        // ... (you can add more as needed)

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
            setShowSlide(true);
            setTimeout(() => setShowSlide(false), 4900);
        }, 5000);

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,   // <-- Directly attach to the body without container
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [10.797379, 60.794533],
            zoom: 9
        });


        mapRef.current = map;
        // Ensuring the map fits its container once loaded
        map.on('load', () => {
            map.resize();
        });

        // Block back arrow navigation:
        window.history.pushState(null, null, window.location.href);
        const handlePopState = () => {
            window.history.forward();
        }
        window.addEventListener('popstate', handlePopState);

        return () => {
            map.remove();
            clearInterval(reviewInterval);
            clearInterval(popupReviewInterval);
            // Cleanup: Remove the popstate event listener
            window.removeEventListener('popstate', handlePopState);
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
        navigate('/logout', { replace: true });
    };

    const handleLogoClick = () => {
        navigate('/dashboard');
    }
    const handleFindPath = () => {
        navigate('/find-path');
    }
    const handleAdmin = () => {
        navigate('/admin')
    }

    return (
        <>
            <div className="navigation-options">
                <div className="dashboard-logo" onClick={handleLogoClick}>TurRuter</div>
                <span className="option-item" onClick={handleProfile}>My Profile</span>
                <div className="edit-dropdown">
                    <span className="option-item">Routes</span>
                    <div className="edit-dropdown-content">
                        <a href="#" onClick={() => navigate('/new-route')}>New Route</a>
                        <a href="#" onClick={() => navigate('/my-routes')}>My Routes</a>
                        <a href="#" onClick={() => navigate('/published-routes')}>Published Routes</a>
                        <a href="#" onClick={handleFindPath}>Find Path</a>
                    </div>
                </div>
                <span className="option-item" onClick={handleLogout}>Logout</span>
                {/* Conditional rendering of Admin link based on userRole */}
                {userRole === 'admin' && <span className="option-item admin-button" onClick={handleAdmin}>Admin</span>}
            </div>
    
            <div className="map-container" ref={mapContainerRef}></div>
    
            <div className={`popup-review-panel ${showSlide ? 'slide-in' : ''}`}>
                {popupReviews[activePopupReviewIndex]}
            </div>
            <div className="review-panel">
                {reviews[activeReviewIndex]}
            </div>
        </>
    );
    

}

export default Dashboard;
