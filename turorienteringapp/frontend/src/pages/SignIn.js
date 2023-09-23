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
                <h1>Log In</h1>
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
                            // Placeholder for email, uncomment if you want to use it.
                            // placeholder="Please Enter Valid Email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input 
                                value={pass} 
                                onChange={(e) => setPass(e.target.value)}
                                type={/*showPassword ? 'text' : */'password'} // Modify this line when you want to implement show/hide password
                                id="password" 
                                name="password"
                                // Placeholder for password, uncomment if you want to use it.
                                // placeholder="********"
                            />
                            {/* Toggle functionality for show/hide password will be implemented here when ready */}
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

export default SignIn;
