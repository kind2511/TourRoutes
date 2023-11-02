import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Using the useAuth hook from AuthContext

const Logout = () => {
    const { signOut } = useAuth();  // Using the signOut function from the context
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            signOut();  // Using the signOut function from the context
            navigate('/login');  // Redirect to login page
        }, 100); // 100ms delay for potential timing issues
    }, [signOut, navigate]);

    return <div>Logging out...</div>;
}

export default Logout;
