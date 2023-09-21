// Import required React hooks and utilities
import React, { useState } from "react";
// Import navigation hook from react-router-dom
import { useNavigate } from 'react-router-dom';
// Import the SignIn component's specific styles
import './SignIn.css';

// Define the SignIn functional component
function SignIn() {
    // State variables for storing email, password, and the show password toggle status
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Hook to programmatically navigate through routes
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder logic for authentication, currently logs email to the console
        // TODO: Replace this with proper authentication logic.
        console.log(email);
    }

    // Function to navigate to the register page when the user wants to sign up
    const handleRegisterClick = () => {
        navigate('/register');
    }

    // Return the JSX for the SignIn component
    return (
        <div className="signin-background">
            <div className="signin-container">
                {/* Company Logo */}
                <img src="/images/TurRuter.gif" alt="TurRuter Logo" className="logo"/>
                <h1>Log In</h1>
                {/* Login form */}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Please Enter Valid Email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input 
                                value={pass} 
                                onChange={(e) => setPass(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                id="password" 
                                name="password"
                                placeholder="********"
                            />
                            {/* Toggle to show/hide password */}
                            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>
                    <button type="submit">Log In</button>
                </form>
                {/* Link to navigate to the register page */}
                <div className="register-prompt">
                    Don't have an account? <span className="register-link" onClick={handleRegisterClick}>Register here.</span>
                </div>
            </div>
        </div>
    );
}

/* Export the SignIn component for use in other parts of the application */
export default SignIn;
