import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const promoSentences = [
    "Explore fascinating routes with TurRuter!",
    "Join us for an unparalleled adventure!",
    "Navigate, Discover, Experience!",
    "Your journey starts here!"
];

const HomePage = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [sentenceIndex, setSentenceIndex] = useState(0);

    useEffect(() => {
        let currentTimer;

        const isCompleteSentence = displayedText === promoSentences[sentenceIndex];
        if (isCompleteSentence) {
            currentTimer = setTimeout(() => {
                const nextIndex = (sentenceIndex + 1) % promoSentences.length;
                setSentenceIndex(nextIndex);
                setDisplayedText('');
            }, 3000);
        } else {
            currentTimer = setTimeout(() => {
                const newText = promoSentences[sentenceIndex].substr(0, displayedText.length + 1);
                setDisplayedText(newText);
            }, 50);
        }

        // Cleanup function to clear any running timer on unmount
        return () => {
            clearTimeout(currentTimer);
        };
    }, [displayedText, sentenceIndex]);

    return (
        <div className="home-page">
            <div className="left">
                <div className="sentence-section">
                    <p>{displayedText}</p>
                </div>
            </div>
            <div className="right">
                <Link to="/" className="nav-logo">
                    TurRuter
                </Link>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button onClick={() => (window.location.href = "/login")}>Login</button>
                    <button onClick={() => (window.location.href = "/register")}>Register</button>
                </div>
                <div className="footer-about">
                    <Link to="/about">About Us</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
