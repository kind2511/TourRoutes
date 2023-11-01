import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import './SignIn.css';

function SignIn() {
    /* Initializing state for email, password, and error message */
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(''); // State to hold the error message
    const [isVerified, setIsVerified] = useState(false); // State for reCAPTCHA verification

    /* Using the useNavigate hook from react-router-dom to programmatically navigate */
    const navigate = useNavigate();

    useEffect(() => {
        /* Block back arrow on the login page after logout */
        function blockBackNavigation() {
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = function() {
                window.history.pushState(null, "", window.location.href);
            };
        }

        blockBackNavigation();

        return () => {
            window.onpopstate = null; // Clean up to avoid any potential interference with other components or behavior
        };

    }, []); // Empty dependency array to run this useEffect only once

    /* This function handles the form submission for sign in */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form behavior
        
        if (!isVerified) {
            setError("Please confirm that you are not a robot.");
            return;
        }

        try {
            /* Sending a POST request to the backend to login */
            const response = await fetch('http://localhost:8000/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ email, password: pass })
            });

            /* Parsing the response from JSON to a JavaScript object */
            const data = await response.json();

            if (data.status === 'success') {
                /* Store the JWT token in local storage */
                localStorage.setItem('token', data.token);
                navigate('/dashboard');  // Navigating to dashboard if login was successful
            } else {
                setError(data.message); // Displaying error to the user
                console.error(data.message);
            }
        } catch (error) {
            setError('Error during login.'); // Displaying error to the user
            console.error('Error during login:', error);
        }
    }

    /* This function handles the click event for the register link */
    const handleRegisterClick = () => {
        navigate('/register');  // Navigating to the register page
    }

    /* This function navigates the user to the homepage when the logo is clicked */
    const handleLogoClick = () => {
        navigate('/');  // Navigating to the homepage
    }

    return (
        <div className="signin-background">
            <div className="signin-container">
                {/* Making the logo clickable to navigate to the homepage */}
                <div className="signin-logo" onClick={handleLogoClick}>TurRuter</div>

                {/* Form for user to input email and password */}
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>} {/* Displaying error message if there's any */}
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
                    {/* Adding reCAPTCHA */}
                    <ReCAPTCHA
                        sitekey="6LetW-koAAAAAJsLZtyr9Lf7ShzcAhXntNqU60Ke"
                        onChange={(value) => setIsVerified(Boolean(value))}
                    />
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
