import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  // Local state to store form data
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  // Hook from 'react-router-dom' to programmatically navigate between routes
  const navigate = useNavigate();

   // Handler to update state when input fields change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  // Handler to process form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if the entered password and confirmPassword are the same
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords don't match!");
      return;
    }
    
    // Debugging: log the form data
    console.log(formData);
  }// Handler to navigate to the login page
  const handleLoginClick = () => {
    navigate('/login');
  }
 
  // Render the registration form
  return (
    <div className="register-background">
      <div className="register-container">
        {/* Replacing the heading with the logo text */}
        <span className="nav-logo">TurRuter</span>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />

          <label htmlFor="email">Email Address</label>
          <input 
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />

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
