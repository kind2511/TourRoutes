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
                    <li><Link to="/login" onClick={toggleMenu}>Login</Link></li> {/* Added Login link in the hamburger dropdown */}
                </ul>
            }
            {/* Removed nav-links as they are no longer needed with the links in the hamburger menu */}
        </nav>
    );
}

export default NavigationBar;
