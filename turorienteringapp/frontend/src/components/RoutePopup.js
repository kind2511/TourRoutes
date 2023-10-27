import React, { useState } from 'react';
import './RoutePopup.css'; 

const RoutePopup = ({ route }) => {
    const [isOpen, setIsOpen] = useState(false);  // State to handle dropdown
    const [comment, setComment] = useState('');  // State to handle user's comment

    const handleCommentSubmit = () => {
        if (comment) {
            // Handle comment submission logic here, e.g., save to database, etc.
            alert('Comment submitted: ' + comment);
            setComment('');  // Clear the comment input after submitting
        } else {
            alert('Please write a comment before submitting.');
        }
    }

    return (
        <div className="route-popup-container">
            <div className="route-name">{route.name}</div>
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
