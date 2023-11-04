import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteUser.css';

const DeleteUser = () => {
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log('User deleted');
    navigate('/dashboard'); // Redirect the user after deletion
  };

  return (
    <div className="delete-user-container">
      <h1>Are you sure you want to delete your user?</h1>
      <p>This action cannot be undone.</p>
      <div className="button-group">
        <button onClick={handleDelete} className="delete-button">Delete User</button>
        <button onClick={() => navigate(-1)} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default DeleteUser;
