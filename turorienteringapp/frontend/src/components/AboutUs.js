import React from 'react';
import './AboutUs.css';

/* function to create segments*/
function AboutUs() {
    const text = {
        welcome: `About Us`,
        precision: `TurRuter provides accurate navigation solutions for urban explorers. We integrate the latest technology to ensure you always find your way, whether in familiar terrains or new cities.`,
        tailored: `Our system is designed to personalize your experience. TurRuter records and recalls places you've visited, making it easy to return to spots you enjoyed or to plan new routes based on your preferences.`,
        updates: `TurRuter offers real-time updates to ensure users are informed about any unexpected changes in their routes. Whether there's a sudden roadblock or an event, our app ensures you’re provided with the most efficient detours.`,
        share: `TurRuter encourages a sense of community among its users. Discover something interesting? Share it on the platform. Likewise, benefit from the experiences and discoveries of others.`,
        voice: `User feedback is a cornerstone of TurRuter's development. We are constantly seeking to improve and update our services based on the needs and preferences of our users.`,
        sustainable: `With growing concerns about the environment, TurRuter provides eco-friendly route options. This feature supports users in making sustainable travel choices.`,
        conclusion: `TurRuter is not just a navigation tool; it's a comprehensive platform aiming to enhance the overall travel experience. Our commitment is to ensure convenience, reliability, and innovation in every journey you undertake.`
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
            <div className="aboutus-logo">TurRuter</div>
        </div>
    );
}

export default AboutUs;
