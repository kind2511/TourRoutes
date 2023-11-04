import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Your fetch logic here
  }, []);

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleUpdateProfile = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const toggleEditing = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDeleteClick = () => {
    navigate('/delete-user'); // Route to the DeleteUser component
  };

  const renderEditableField = (field, value) => (
    <div className="editable-field">
      <span>{value}</span>
      {isEditing[field] ? (
        <>
          <input
            value={value}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, [field]: e.target.value }))
            }
          />
          <button onClick={() => handleUpdateProfile(field)}>Save</button>
        </>
      ) : (
        <div className="edit-dropdown">
          <span>Edit</span>
          <div className="edit-dropdown-content">
            <a onClick={() => toggleEditing(field)}>Edit</a>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="user-profile-background">
      <div className="user-profile-container">
        <div className="userprofile-logo" onClick={handleLogoClick}>TurRuter</div>
        <p>
          <strong>First Name:</strong>
          {renderEditableField('firstName', userData.firstName)}
        </p>
        <p>
          <strong>Last Name:</strong>
          {renderEditableField('lastName', userData.lastName)}
        </p>
        <p>
          <strong>Email:</strong>
          {renderEditableField('email', userData.email)}
        </p>
        <div className="profile-action">
          {/* Changed from button to clickable text */}
          <span className="delete-user-text" onClick={handleDeleteClick}>
            Delete User
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
