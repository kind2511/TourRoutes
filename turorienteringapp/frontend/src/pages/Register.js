import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords don't match!");
      return;
    }
    
    // Added API call to backend for registration
    try {
        const response = await fetch('http://localhost:8000/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            // Handle successful registration, e.g., redirect to dashboard or login
            navigate('/dashboard');
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
  }

  const handleLoginClick = () => {
    navigate('/login');
  }

  return (
    <div className="register-background">
      <div className="register-container">
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
