import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {

  // State for form fields
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  // State for error messages
  const [errorMessage, setErrorMessage] = useState("");

  // React Router hook to programmatically navigate
  const navigate = useNavigate();

  // Update form data state on input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  // Handle form submission and user registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    try {
      setErrorMessage(""); // Clear any previous errors

      const response = await fetch('http://localhost:8000/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        navigate('/dashboard');
      } else {
        console.error(data.message);
        setErrorMessage(data.message); // Display the error message from the response
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Error during registration. Please try again later.');
    }
  }

  // Navigate to login page
  const handleLoginClick = () => {
    navigate('/login');
  }

  return (
    <div className="register-background">
      <div className="register-container">
        {/* Navigate to homepage when the TurRuter logo is clicked */}
        <span className="nav-logo" onClick={() => navigate('/')}>TurRuter</span>

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if it exists */}

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} required />

          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} required />

          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} required />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />

          <button type="submit">Register</button>
        </form>

        <div className="login-prompt">
          Already a member? <span className="login-link" onClick={handleLoginClick}>Log In</span>
        </div>
      </div>
    </div>
  );
}
export default Register;