import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing icon component from FontAwesome
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Importing trash icon from FontAwesome solid icon set
import './MyRoutesPopup.css';

const MyRoutesPopup = ({ route, distance, onDelete }) => {
    const handleDeleteClick = () => {
        onDelete(route.id);
    };

    return (
        <div className="my-routes-popup-container">
            <div className="my-routes-name">{route.name}</div>
            <div className="my-routes-distance">{distance} km</div>
            <span className="my-routes-delete-icon" onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
            </span>
        </div>
    );
}

export default MyRoutesPopup;
