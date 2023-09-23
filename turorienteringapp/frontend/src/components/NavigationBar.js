// components/NavigationBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';  // styles specific to the navigation bar

function NavigationBar() {
    return (
        <nav className="nav-bar">
            <Link to="/" className="nav-logo">TurRuter</Link>
            <ul className="nav-links">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                {/* Additional navigation links can be added here */}
            </ul>
        </nav>
    );
}

export default NavigationBar;
