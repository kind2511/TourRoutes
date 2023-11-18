import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'; 

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.clear(); // Clears all local storage items
      // Then navigate to login page after 5 sec
      navigate('/login');
    }, 5000); 
    return () => {
      clearTimeout(timer); // Cleanup timer
      localStorage.clear(); 
    };
  }, [navigate]);

  return (
    <div className="welcome-page">
      <h1>Welcome to TurRuter</h1>
      <p>Please Wait then login..</p>
    </div>
  );
}

export default Welcome;
