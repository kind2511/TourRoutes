import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="nav-bar">
            <div className="logo-menu-container">
                <Link to="/" className="nav-logo">TurRuter</Link>
                <div className="hamburger-menu" onClick={toggleMenu}>☰</div>
            </div>
            {isMenuOpen && 
                <ul className="hamburger-links">
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                </ul>
            }
            <ul className="nav-links">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
