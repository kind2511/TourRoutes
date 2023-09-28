import React from 'react';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <button onClick={() => window.location.href="/map"} className="explore-button">Explore</button>
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
