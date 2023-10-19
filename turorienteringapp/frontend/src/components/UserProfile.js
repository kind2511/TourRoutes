import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    // State to store user's profile data
    const [userData, setUserData] = useState({});

    // State to manage the edit mode for each individual field
    const [isEditing, setIsEditing] = useState({ 
        firstName: false, 
        lastName: false, 
        email: false 
    });

    /*backend-----> :)*/
    useEffect(() => {
        /* 
           TODO: Fetch the user's profile data from the backend when the component mounts.
           Use an API call to get the data and then update the userData state.
        */
    }, []);

    /**
     * Update a user's profile data and reset the edit mode for the field.
     */
    const handleUpdateProfile = (field) => {
        setIsEditing(prevEditingState => ({ 
            ...prevEditingState, 
            [field]: false 
        }));
        
        /* 
           TODO: Send the updated data to the backend.
           Use an API call to send the new data (from userData) to update the user profile.
        */
    };

    /*
     * Render an editable field with options to save or switch to edit mode.
     *
     * @param {string} field - The name of the field (e.g., "firstName")
     * @param {string} value - The current value of the field
     * @return {JSX.Element} - A React element that represents the editable field
     */
    const renderEditableField = (field, value) => (
        <div>
            {isEditing[field] ? (
                <>
                    <input
                        value={value}
                        onChange={(e) => setUserData(prevData => ({ 
                            ...prevData, 
                            [field]: e.target.value 
                        }))}
                    />
                    <button onClick={() => handleUpdateProfile(field)}>Save</button>
                </>
            ) : (
                <>
                    <span>{value}</span>
                    <div className="edit-dropdown">
                        <span>Edit</span>
                        <div className="edit-dropdown-content">
                            <a onClick={() => setIsEditing(prevEditingState => ({ 
                                ...prevEditingState, 
                                [field]: true 
                            }))}>Edit</a>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    {/*Render*/}
    return (
        <div className="user-profile-background">
            <div className="user-profile-container">
                <h2>User Profile</h2>
                {/*Bold Text */}
                <p><strong>First Name:</strong> {renderEditableField("firstName", userData.firstName)}</p>
                <p><strong>Last Name:</strong> {renderEditableField("lastName", userData.lastName)}</p>
                <p><strong>Email:</strong> {renderEditableField("email", userData.email)}</p>
            </div>
        </div>
    );
};

export default UserProfile;
