import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importing the useNavigate hook
import './AboutUs.css';

/* function to create segments*/ 
function AboutUs() {
    const text = {
        welcome: `About Us`,
        interactiveMapping: `Our platform has a big map of the whole world. You can see names, places, and addresses everywhere.`,
        routeCreation: `You can draw lines on the map to make routes from one place to another. Our tool figures out how far it is and keeps the info safe for you.`,
        privacyOptions: `You can keep your routes private if you don't want others to see them. We care about your privacy.`,
        efficientNavigation: `Our tool helps you find the quickest way between two places. Just tell it where to go, and it shows you the way.`,
        userFriendlyDesign: `Our app is easy to use and looks nice. It's made for everyone to enjoy using.`,
        secureDataStorage: `We keep all your data safe. You can trust us with your routes and information.`,
        conclusion: `Our application is more than just maps. It's a tool for exploring the world easily to make your travel easy, efficient, and enjoyable.`
    };
    
    //Navigate Function
    const navigate = useNavigate();

    // Function to handle the logo click
    const handleLogoClick = () => {
        navigate('/');  // Navigates to the homepage
    };

    return (
        <div className="container">
            <div className="title">{text.welcome}</div>
            <div className="segment">{text.precision}</div>
            <div className="segment">{text.tailored}</div>
            <div className="segment">{text.updates}</div>
            <div className="segment">{text.share}</div>
            <div className="segment">{text.voice}</div>
            <div className="segment">{text.sustainable}</div>
            <div className="conclusion">{text.conclusion}</div>
            <div className="aboutus-logo" onClick={handleLogoClick}>TurRuter</div>
        </div>
    );
}

export default AboutUs;
