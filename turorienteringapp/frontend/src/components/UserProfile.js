/* test test test*/

import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8000/api/v1/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = await response.json();
                if (data.status === 'success') {
                    setUserData(data.user);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, []);

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <p><strong>First Name:</strong> {userData.firstName}</p>
            <p><strong>Last Name:</strong> {userData.lastName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {/* Add any other user properties as needed */}
        </div>
    );
}

export default UserProfile;
