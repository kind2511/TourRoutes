import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const LogOut = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate(); // Using useNavigate hook for navigation

    useEffect(() => {
        logout();
        navigate('/login'); // Redirect to login page
    }, [logout, navigate]);

    return <div>Logging out...</div>;
}

export default LogOut;
