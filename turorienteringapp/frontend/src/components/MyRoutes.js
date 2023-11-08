import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './MyRoutes.css';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';


const MyRoutes = () => {
    const mapContainerRef = useRef(null);

    // Initialize the map and plot routes
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [10.797379, 60.794533],
            zoom: 9
        });

        // Clean up on unmount
        return () => map.remove();
    }, []);

    return (
        <div className="mapContainer" ref={mapContainerRef} />
    );
};

export default MyRoutes;
