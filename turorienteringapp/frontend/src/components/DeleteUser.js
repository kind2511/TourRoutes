import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteUser.css';

const DeleteUser = () => {
  const navigate = useNavigate();

  /**
 * Handles the account deletion process.
 * Sends a DELETE request to the server to remove the user's profile.
 * On success, logs a message and redirects to the login page.
 * Catches and logs any errors that occur during the process.
 */

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/deleteMyProfile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        credentials: 'same-origin',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log('Account deleted successfully');
        navigate('/login'); // Redirect to login after account deletion
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="delete-user-container">
      <div className="delete-confirmation-box">
        <p>Are you sure you want to delete your account?</p>
        <p>This action cannot be undone.</p>
        <div className="delete-buttons">
          <button className="delete-account-btn" onClick={handleDelete}>Delete Account</button>
          <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
