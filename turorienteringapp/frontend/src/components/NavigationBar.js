import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

/*
 * This function component for navigation bar
 * It will render the  main navigation for this application
 */
function NavigationBar() {
    return (
        <nav className="nav-bar">
            <div className="logo-menu-container">
                <Link to="/" className="nav-logo">TurRuter</Link>
                <div className="hamburger-menu">☰</div>
            </div>
            <ul className="nav-links">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
