import React from 'react';

const DeleteUserButton = ({ userId, onDelete }) => {
  return (
    <button onClick={() => onDelete(userId)} className="admin-users-delete-button">
      Delete
    </button>
  );
};

export default DeleteUserButton;
