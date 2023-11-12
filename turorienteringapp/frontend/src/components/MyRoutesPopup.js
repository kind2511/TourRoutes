import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing icon component from FontAwesome
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Importing trash icon from FontAwesome 
import './MyRoutesPopup.css';


const MyRoutesPopup = ({ route, distance, onDelete }) => {

    // State for route's privacy (private/public)
    const [isPrivate, setIsPrivate] = useState(route.isPrivate);

    // Deletes the route
    const handleDeleteClick = () => {
        onDelete(route.id);
    };

    // Handles route visibility change
    const handleVisibilityChange = (event) => {
        setIsPrivate(event.target.value === 'private');
        // TOdo: the visibiluty will be update for backend 
    };

    return (
        <div className="my-routes-popup-container">
            <div className="my-routes-name">{route.name}</div>
            <div className="my-routes-distance">{distance} km</div>
            <div className="privacy-toggle">
                <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={!isPrivate}
                        onChange={handleVisibilityChange}
                    />
                    Public
                </label>
                <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={isPrivate}
                        onChange={handleVisibilityChange}
                    />
                    Private
                </label>
            </div>
            <span className="my-routes-delete-icon" onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
            </span>
        </div>
    );
}

export default MyRoutesPopup;
