import React, { useState } from "react";
import "./UpdatePassword.css"; 

const UpdatePassword = ({ close }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = async () => {
  //TODO logic to update password here!
    console.log("Password Updated:", password);
    close();
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
