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

    // This is where you'd typically make a backend call to register the user
    // It's commented out for now, but serves as a placeholder for that functionality
    /*
    try {
        const response = await axios.post('/api/register', formData);
        if (response.data.success) {
            console.log('Registration successful!');
            navigate('/login');  // Navigate to login after successful registration
        } else {
            console.log('Registration failed!:', response.data.message);
        }
    } catch (error) {
        console.log('An error occurred while registering:', error);
    }
    */

    // Debugging: log the form data
    console.log(formData);
  }

  // Handler to navigate to the login page
  const handleLoginClick = () => {
    navigate('/login');
  }

  // Render the registration form
  return (
    <div className="register-background">
      <div className="register-container">
        <img src="/images/TurRuter.gif" alt="TurRuter Logo" className="logo"/>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input 
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input 
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <input 
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
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
