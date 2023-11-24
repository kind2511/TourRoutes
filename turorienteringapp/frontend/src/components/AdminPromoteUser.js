import React from 'react';

const PrmoteUserButton = ({ userId, onPromote }) => {
    return (
        <button onClick={() => onPromote(userId)} className="admin-users-promote-button">
            Promote
        </button>
    );
};

export default PrmoteUserButton;
