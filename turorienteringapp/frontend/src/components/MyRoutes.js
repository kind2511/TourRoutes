import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import './MyRoutes.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

// Color for routes
const colors = ['#F00', '#0F0', '#00F', '#FF0', '#0FF', '#F0F', '#888', '#123456', '#654321', '#ABCDEF'];

const MyRoutes = () => {
    const mapContainerRef = useRef(null);
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState(null); // For displaying errors

    const fetchRoutes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/tourRoutes/');
            const backendRoutes = response.data.data.tourRoutes || []; //  handle potential null/undefined values
            console.log("Fetched routes:", backendRoutes);
            setRoutes(backendRoutes);
        } catch (err) {
            console.error("Error fetching routes:", err);
            setError("There was a problem fetching the routes. Please try again.");
        }
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v11',
            center: [10.797379, 60.794533],
            zoom: 9
        });

        map.on('load', () => {
            routes.forEach((route, index) => {
                if (!route.coordinates || route.coordinates.length === 0) {
                    console.warn("Route without valid coordinates:", route);
                    return;
                }

                const sourceName = `source-${route.name}`;
                if (!map.getSource(sourceName)) {
                    map.addSource(sourceName, {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: route.coordinates
                            }
                        }
                    });

                    map.addLayer({
                        id: `layer-${route.name}`,
                        type: 'line',
                        source: sourceName,
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': colors[index % colors.length],
                            'line-width': 8
                        }
                    });
                }

                route.coordinates.forEach((coord) => {
                    new mapboxgl.Marker()
                        .setLngLat(coord)
                        .addTo(map);
                });
            });
        });

        // Clean up on component unmount
        return () => map.remove();
    }, [routes]);

    return (
        <div className="relativeContainer">
            {error && <div className="errorNotification">{error}</div>}
            <div className="mapContainer" ref={mapContainerRef}></div>
        </div>
    );
}

export default MyRoutes;
