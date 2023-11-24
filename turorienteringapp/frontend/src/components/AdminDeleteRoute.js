import React from "react";

const DeleteRouteButton = ({ routeId, onDelete }) => {
    return (
        <button onClick={() => onDelete(routeId)} className="admin-routes-delete-button">
            Delete
        </button>
    );
};

export default DeleteRouteButton;