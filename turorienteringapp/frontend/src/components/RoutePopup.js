import React from 'react';
import './RoutePopup.css';

const RoutePopup = ({ route, distance }) => {
    return (
        <div className="route-popup-container">
            <div className="route-name">{route.name}</div>
            <div className="route-distance">{distance} km</div>
        </div>
    );
}

export default RoutePopup;
