import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  // State to store user's profile data
  const [userData, setUserData] = useState({});

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

  //--------------------------------------------------------------------------------------
  const toggleEditing = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDeleteClick = () => {
    navigate("/delete-user"); // Route to the DeleteUser component
  };
  //----------------------------------------------------------------------------------------

  // /*
  //  * Render an editable field with options to save or switch to edit mode.
  //  *
  //  * @param {string} field - The name of the field (e.g., "firstName")
  //  * @param {string} value - The current value of the field
  //  * @return {JSX.Element} - A React element that represents the editable field
  //  */
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

  {
    /*Render*/
  }
  return (
    <div className="user-profile-background">
      <div className="user-profile-container">
        <div className="userprofile-logo" onClick={handleLogoClick}>
          TurRuter
        </div>
        <p>
          <strong>First Name:</strong>
          {renderEditableField("firstName", userData.firstName)}
        </p>
        <p>
          <strong>Last Name:</strong>
          {renderEditableField("lastName", userData.lastName)}
        </p>
        <p>
          <strong>Email:</strong>
          {renderEditableField("email", userData.email)}
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
