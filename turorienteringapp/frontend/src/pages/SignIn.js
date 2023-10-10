import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
    const [email, setEmail] = useState('');  // State to handle email input
    const [pass, setPass] = useState('');   // State to handle password input
    
    // This state is declared but not used yet. Uncomment when ready to use.
    // const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(); // Hook to programmatically navigate to different routes

    const handleSubmit = async (e) => {
        e.preventDefault();

        // API call to backend for user login
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password: pass })
            });

            const data = await response.json();

            if (data.status === 'success') {
                // On successful login, redirect the user to the dashboard
                navigate('/dashboard');
            } else {
                console.error(data.message);  // Log any error messages from the backend
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    // Function to handle the click on the "Register here" link
    const handleRegisterClick = () => {
        navigate('/register');
    }

    return (
        <div className="signin-background">
            <div className="signin-container">
                <div className="signin-logo">TurRuter</div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPass(e.target.value)}
                                type='password'
                                id="password" 
                                name="password"
                            />
                        </div>
                    </div>
                    <div className="forgot-password">
                        <span onClick={() => { /* Handle forgot password logic here */ }}>
                            Forgot your password?
                        </span>
                    </div>
                    <button type="submit">Log In</button>
                </form>
                <div className="register-prompt">
                    Don't have an account? <span className="register-link" onClick={handleRegisterClick}>Register here.</span>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
