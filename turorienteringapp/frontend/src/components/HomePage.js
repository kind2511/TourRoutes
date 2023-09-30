import React, { useState, useEffect } from 'react';
import './HomePage.css';

const sentences = [
    "Explore fascinating routes with TurRuter!",
    "Discover new places and adventures today.",
    "Join the TurRuter community and share your journeys.",
    "Trusted by thousands for the best traveling experience."
];

function HomePage() {
    const [currentText, setCurrentText] = useState('');
    const [action, setAction] = useState('typing');
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

    useEffect(() => {
        let timer;

        if (action === 'typing' && currentText !== sentences[currentSentenceIndex]) {
            timer = setTimeout(() => {
                setCurrentText(prev => sentences[currentSentenceIndex].substr(0, prev.length + 1));
            }, 50);  // increased typing speed
        } else if (action === 'typing' && currentText === sentences[currentSentenceIndex]) {
            timer = setTimeout(() => {
                setAction('deleting');
            }, 1500);  // reduced waiting time to 1.5 seconds
        } else if (action === 'deleting' && currentText !== '') {
            timer = setTimeout(() => {
                setCurrentText(prev => prev.substr(0, prev.length - 1));
            }, 25);  // increased deleting speed
        } else if (action === 'deleting' && currentText === '') {
            setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
            setAction('typing');
        }

        return () => clearTimeout(timer);

    }, [action, currentText, currentSentenceIndex]);

    return (
        <div className="home-page">
            <div className="sentence-section">
                <p>{currentText}</p>
            </div>
            
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
