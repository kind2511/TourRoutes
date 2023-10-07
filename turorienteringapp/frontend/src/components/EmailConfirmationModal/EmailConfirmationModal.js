import React from 'react';
import './EmailConfirmationModal.css';

const EmailConfirmationModal = ({ isOpen, close }) => {
  if (!isOpen) return null;

  return (
    <div className="emailConfirmationModalOverlay">
      <div className="emailConfirmationModal">
        <p>Thank you for registering! Please check your email for a confirmation link.</p>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default EmailConfirmationModal;
