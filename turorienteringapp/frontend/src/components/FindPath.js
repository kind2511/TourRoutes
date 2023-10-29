import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import './FindPath.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

const FindPath = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const navigate = useNavigate();

    // Initialization of the map
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v11',
            center: [10.797379, 60.794533],
            zoom: 9
        });

        mapRef.current = map;

        return () => map.remove();
    }, []);

    // Navigate back to the dashboard
    const handleLogoClick = () => {
        navigate('/dashboard');
    }

    const handleFindPathClick = () => {
        // Logic to handle path finding will be placed here :)
    }

    return (
        <div className="fullMapContainer">
            <div ref={mapContainerRef} className="fullMap">
                <div className="findPath-logo" onClick={handleLogoClick}>
                    TurRuter
                </div>
                <div className="pathInputContainer">
                    <input type="text" placeholder="Start from" className="pathInput" />
                    <input type="text" placeholder="End with" className="pathInput" />
                    <button onClick={handleFindPathClick} className="findPathButton">Find Path</button>
                </div>
            </div>
        </div>
    );
}

export default FindPath;
