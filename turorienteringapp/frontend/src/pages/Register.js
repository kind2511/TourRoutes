import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import EmailConfirmationModal from '../components/EmailConfirmationModal/EmailConfirmationModal';

function Register() {
  
  /* State for form fields */
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  /* State for email confirmation modal visibility */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* React Router hook to programmatically navigate */
  const navigate = useNavigate();

  /* Update form data state on input change */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  /* Handle form submission and user registration */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords don't match!");
      return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/v1/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            setIsModalOpen(true);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
  }

  /* Close email confirmation modal and navigate to dashboard */
  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/dashboard');
  }

  /* Navigate to login page */
  const handleLoginClick = () => {
    navigate('/login');
  }

  return (
    <div className="register-background">
      <div className="register-container">
        <span className="nav-logo">TurRuter</span>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} />

          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} />

          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />

          <button type="submit">Register</button>
        </form>

        <div className="login-prompt">
          Already a member? <span className="login-link" onClick={handleLoginClick}>Log In</span>
        </div>
      </div>

      <EmailConfirmationModal isOpen={isModalOpen} close={handleModalClose} />   
    </div>
  );
}

export default Register;
