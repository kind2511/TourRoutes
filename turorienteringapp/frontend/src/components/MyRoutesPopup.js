import React, { useState } from 'react';
import './MyRoutesPopup.css';

const MyRoutesPopup = ({ route, distance }) => {

    //useState to manage the select options
    const [selectedOption, setSelectedOption] = useState('');

    // Handler for change options on dropdown
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="my-routes-popup-container">
            <select className="dropdown" value={selectedOption} onChange={handleChange}>
                <option value="" hidden></option>
                <option value="Option1">:)</option>
                <option value="Option2">:)</option>
            </select>
            <div className="my-routes-name">{route.name}</div>
            <div className="my-routes-distance">{distance} km</div>
        </div>
    );
}

export default MyRoutesPopup;
