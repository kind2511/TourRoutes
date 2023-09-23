import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    // This state is declared but not used yet. Uncomment when ready to use.
    // const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    const handleRegisterClick = () => {
        navigate('/register');
    }

    return (
        <div className="signin-background">
            <div className="signin-container">
                {/* Replacing the h1 tag with the styled logo */}
                <div className="signin-logo">TurRuter</div>
                
                {/* Login form */}
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
                                type={/*showPassword ? 'text' : */'password'}
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
                {/* Link to navigate to the register page */}
                <div className="register-prompt">
                    Don't have an account? <span className="register-link" onClick={handleRegisterClick}>Register here.</span>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
