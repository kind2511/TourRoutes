import React from 'react';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
         <a href="/map" className="explore-trails-link">Explore Trails</a>
            <div className="bottom-bar"></div>
            <div className="footer-section">
                <a href="/privacy-policy">Privacy Policy</a>
                •
                <a href="/terms">Terms</a>
                •
                <a href="/cookie-policy">Cookie Policy</a>
                <br/>
                © 2023 TurRuter. All rights reserved.
            </div>
        </div>
    );
}

export default HomePage;
