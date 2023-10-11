import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
    /* Initializing state for email and password */
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    /* Using the useNavigate hook from react-router-dom to programmatically navigate */
    const navigate = useNavigate();

    /* This function handles the form submission for sign in */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form behavior
        
        try {
            /* Sending a POST request to the backend to login */
            const response = await fetch('http://localhost:8000/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: pass })
            });

            /* Parsing the response from JSON to a JavaScript object */
            const data = await response.json();

            if (data.status === 'success') {
                navigate('/dashboard');  // Navigating to dashboard if login was successful
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    /* This function handles the click event for the register link */
    const handleRegisterClick = () => {
        navigate('/register');  // Navigating to the register page
    }

    return (
        <div className="signin-background">
            <div className="signin-container">
                {/* Displaying the logo or brand name */}
                <div className="signin-logo">TurRuter</div>

                {/* Form for user to input email and password */}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} /* Updating the email state on change */
                            type="email" 
                            id="email" 
                            name="email" 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input 
                                value={pass} 
                                onChange={(e) => setPass(e.target.value)} /* Updating the password state on change */
                                type='password'
                                id="password" 
                                name="password"
                            />
                        </div>
                    </div>
                    {/* Link for the user in case they forgot their password */}
                    <div className="forgot-password">
                        <span onClick={() => { /* Handle forgot password logic here */ }}>
                            Forgot your password?
                        </span>
                    </div>
                    {/* Submit button to log in */}
                    <button type="submit">Log In</button>
                </form>

                {/* Providing an option to navigate to registration if user does not have an account */}
                <div className="register-prompt">
                    Don't have an account? 
                    <span className="register-link" onClick={handleRegisterClick}>Register here.</span>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
