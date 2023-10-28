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

    return (
        <div className="fullMapContainer">
            <div ref={mapContainerRef} className="fullMap">
                <div
                    className="findPath-logo"
                    onClick={handleLogoClick}
                >
                    TurRuter
                </div>
            </div>
        </div>
    );
}

export default FindPath;
