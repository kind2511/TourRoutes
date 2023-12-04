import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
    // Text for the about us section
    const aboutText = `
        TurRuter has a big map of the whole world. You can see names, places, and addresses everywhere. 
        You can draw lines on the map to make routes from one place to another. Our tool figures out how far it is and 
        keeps the info safe for you. You can keep your routes private if you don't want others to see them. We care about 
        your privacy. Our tool helps you find the quickest way between two places. Just tell it where to go, and it shows 
        you the way. Our app is easy to use and looks nice. It's made for everyone to enjoy using. We keep all your data 
        safe. You can trust us with your routes and information. Our application is more than just maps. It's a tool for 
        exploring the world easily to make your travel easy, efficient, and enjoyable.
    `;

    // Navigate function from react-router-dom
    const navigate = useNavigate();

    // Handle logo click to navigate to the homepage
    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="aboutus-container">
            <div className="aboutus-title">About Us</div>
            <div className="aboutus-text">{aboutText}</div>
            <div className="aboutus-logo" onClick={handleLogoClick}>TurRuter</div>
        </div>
    );
}

export default AboutUs;
