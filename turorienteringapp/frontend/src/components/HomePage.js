import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

/* An array of sentences that show on the left side of the homepage */
const sentences = [
    "Explore fascinating routes with TurRuter!",
    "Join us for an unparalleled adventure!",
    "Navigate, Discover, Experience!",
    "Your journey starts here!"
];

function HomePage() {
    /* Using React's useState to manage the current displayed text and the current sentence's index */
    const [currentText, setCurrentText] = useState('');
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

    /* useEffect hook to manage the sliding effect of the sentences */
    useEffect(() => {
        let timer;
        if (currentText === sentences[currentSentenceIndex]) {
            timer = setTimeout(() => {
                setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
                setCurrentText('');
            }, 3000);
        } else {
            timer = setTimeout(() => {
                setCurrentText(prev => sentences[currentSentenceIndex].substr(0, prev.length + 1));
            }, 50);
        }

        /* Clearing the timer to avoid any potential memory leaks */
        return () => clearTimeout(timer);
    }, [currentText, currentSentenceIndex]);

    /* Rendering the HomePage component */
    return (
        <div className="home-page">
            <div className="left">
                <div className="sentence-section">
                    <p>{currentText}</p>
                </div>
            </div>
            <div className="right">
                {/* TurRuter logo displayed above the buttons */}
                <Link to="/" className="nav-logo">TurRuter</Link>

                {/* Buttons section */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button onClick={() => window.location.href="/login"}>Login</button>
                    <button onClick={() => window.location.href="/register"}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
