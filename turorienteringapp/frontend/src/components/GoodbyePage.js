import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GoodbyePage.css'; 

const GoodbyePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000); // Wait for 5  seconds the direct to login page

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [navigate]);

  return (
    <div className="goodbye-container">
      <h1>Sorry to see you go :(</h1>
      <p>Hope we see you again :)</p>
    </div>
  );
};

export default GoodbyePage;
