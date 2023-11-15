import React, { useState } from "react";
import "./UpdatePassword.css";

const UpdatePassword = ({ close }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  //------------------------------------------------------->

  // Function to validate password length
  const validatePasswordLength = (password) => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
    } else {
      setError(""); // Clear error if length requirement  meet
    }
  };

  
  //------------------------------------------------------->

  // Function to validate that passwords match
  const validatePasswordsMatch = (password, confirmPassword) => {
    // Only check if there is no length error and both passwords have been entered
    if (!error && password && confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError(""); // Clear error if passwords match or one of them is still empty
    }
  };

  
  //------------------------------------------------------->

  //validate password length on every change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePasswordLength(newPassword);
    // If confirmPassword is already entered, validate for match
    if (confirmPassword) {
      validatePasswordsMatch(newPassword, confirmPassword);
    }
  };

  
  //------------------------------------------------------->

  //validate passwords match on every change
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    // Validate for match only if write in input feild
    if (password) {
      validatePasswordsMatch(password, newConfirmPassword);
    }
  };

  
  //------------------------------------------------------->

  //Logic to handle update the password 

  const handleUpdate = async () => {
    setError(''); // Clear any existing errors
    setSuccess(''); // Clear all existing success message
  
    // Do not proceed if there is   error or if the passwords do not match
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    // Proceed with the API call if validations pass
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
        setSuccess("Password updated successfully."); // show the success message on container
        // clear the password fields
        setPassword('');
        setConfirmPassword('');
        // Optionally, close the dialog after a delay
        setTimeout(() => {
          close();
        }, 3000); // show the success message on container for three seconds then remove it
      } else {
        // Handle API errors_ backend requirements
        setError(data.message || "Failed to update password.");
      }
    } catch (err) {
      setError("An error occurred while updating the password.");
      console.error("Error updating password:", err);
    }
  };
  
  
  //------------------------------------------------------->

  //Rendring
  return (
    <div className="update-password-container">
      <h1>Update Password</h1>
      {error && <p className="update-password-error">{error}</p>}
      {success && <p className="update-password-success">{success}</p>}
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <div className="update-password-buttons">
        <button className="update-password-btn" onClick={handleUpdate}>Update Password</button>
        <button className="cancel-btn" onClick={close}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdatePassword;