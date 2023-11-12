import React from 'react';
import './MyRoutesPopup.css';

const MyRoutesPopup = ({ route, distance }) => {
    return (
        <div className="my-routes-popup-container">
            <div className="my-routes-name">{route.name}</div>
            <div className="my-routes-distance">{distance} km</div>
        </div>
    );
}

export default MyRoutesPopup;
