import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import UpdatePassword from './UpdatePassword';

const UserProfile = () => {
  // State to store user's profile data
  const [userData, setUserData] = useState({});
  const [showUpdatePassword, setShowUpdatePassword] = useState(false); // State to show/hide UpdatePassword
  

  // State to manage the edit mode for each individual field
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  const navigate = useNavigate(); // Navigation function

  // Sends a get request to the backend and retrives the users personal data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/myProfile",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            credentials: "same-origin",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setUserData({
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          email: data.data.user.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  /**
   * Update a user's profile data and reset the edit mode for the field.
   */
  const handleUpdateProfile = async (field) => {
    setIsEditing((prevEditingState) => ({
      ...prevEditingState,
      [field]: false,
    }));

    // Sends the updated userdata to the backend via a patch request, which then persists the updated userdata.
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/updateMyProfile",
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          credentials: "same-origin",
          body: JSON.stringify(userData),
        }
      );
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const toggleEditing = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDeleteClick = () => {
    navigate("/delete-user"); // Route to the DeleteUser component
  };

  const handleBackClick = () => {
    navigate('/dashboard');
};

const handleUpdatePasswordClick = () => {
  setShowUpdatePassword(!showUpdatePassword);
};


const renderEditableField = (field, value) => (
  <div className="editable-field">
    {isEditing[field] ? (
      <>
        <input
          type="text"
          value={value}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, [field]: e.target.value }))
          }
        />
        <div className="field-actions">
          <button className="field-save-btn" onClick={() => handleUpdateProfile(field)}>Save</button>
          <button className="field-cancel-btn" onClick={() => setIsEditing((prev) => ({ ...prev, [field]: false }))}>Cancel</button>
        </div>
      </>
    ) : (
      <div className="field-value-edit">
        <span className="field-value">{value}</span>
        <span className="edit-text" onClick={() => toggleEditing(field)}>Edit</span>
      </div>
    )}
  </div>
);


return (
  <div className="user-profile-background">
    <button onClick={handleBackClick} className="UserProfileBackButton">Back</button>
    <div className="user-profile-container">
      <div className="userprofile-logo" onClick={handleLogoClick}>
        TurRuter
      </div>
      <div>
        <strong>First Name:</strong>
        {renderEditableField("firstName", userData.firstName)}
      </div>
      <div>
        <strong>Last Name:</strong>
        {renderEditableField("lastName", userData.lastName)}
      </div>
      <div>
        <strong>Email:</strong>
        {renderEditableField("email", userData.email)}
      </div>
      <div className="profile-action">
        <span className="change-password-text" onClick={handleUpdatePasswordClick}>
          Change Password
        </span>
        <span className="delete-user-text" onClick={handleDeleteClick}>
          Delete User
        </span>
      </div>
    </div>
    {showUpdatePassword && <UpdatePassword close={() => setShowUpdatePassword(false)} />}
  </div>
);

  
};

export default UserProfile;
