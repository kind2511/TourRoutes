import React, { useState } from "react";
import "./UpdatePassword.css";

const UpdatePassword = ({ close }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdate = async () => {
        // Proceed with the API call
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/updateMyPassword', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ password, confirmPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                // Password updated successfully
                close(); // Close the update password dialog
            } else {

                console.error("Failed to update password:", data.message);
            }
        } catch (err) {

            console.error("Error updating password:", err);
        }
    };

    return (
        <div className="update-password-container">
            <h1>Update Password</h1>
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="update-password-buttons">
                <button className="update-password-btn" onClick={handleUpdate}>Update Password</button>
                <button className="cancel-btn" onClick={close}>Cancel</button>
            </div>
        </div>
    );
};

export default UpdatePassword;
