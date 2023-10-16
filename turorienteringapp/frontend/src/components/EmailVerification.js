// EmailVerification.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmailVerification({ token }) {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/users/verify-email/${token}`);
        const data = await response.json();

        if (data.status === 'success') {
          navigate('/login', { state: { message: "Email verified! Please log in." } });
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error during email verification:', error);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      Verifying your email...
    </div>
  );
}

export default EmailVerification;
