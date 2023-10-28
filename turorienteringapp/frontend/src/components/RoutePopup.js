import React, { useState } from 'react';
import './RoutePopup.css'; 

const RoutePopup = ({ route, distance }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState('');

    const handleCommentSubmit = () => {
        if (comment) {
            alert('Comment submitted: ' + comment);
            setComment('');
        } else {
            alert('Please write a comment before submitting.');
        }
    }

    return (
        <div className="route-popup-container">
            <div className="route-name">{route.name}</div>
            <div className="route-distance">{distance} km</div>
            <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '▲' : '▼'}
            </button>
            
            {isOpen && (
                <div className="route-details">
                    <div className="write-comment-section">
                        <textarea 
                            placeholder="Write your comment..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <button onClick={handleCommentSubmit}>Submit Comment</button>
                    </div>
                    <button className="contact-button" onClick={() => alert('Contact feature coming soon!')}>
                        Contact User
                    </button>
                </div>
            )}
        </div>
    );
}

export default RoutePopup;
