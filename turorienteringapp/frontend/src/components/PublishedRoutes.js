import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { length } from '@turf/turf';  // Import specific function from Turf for calculating distance
import './PublishedRoutes.css';
import RoutePopup from './RoutePopup';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

// Define a list of colors for routes
const colors = ['#F00', '#0F0', '#00F', '#FF0', '#0FF', '#F0F', '#888', '#123456', '#654321', '#ABCDEF'];

const PublishedRoutes = () => {
    const navigate = useNavigate();
    const mapContainerRef = useRef(null);
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState(null);

    // Fetch published routes from the backend with authorization
    const fetchRoutes = async () => {
        try {
            const token = localStorage.getItem('token');// token from local storge
            const response = await axios.get('http://localhost:8000/api/v1/tourRoutes/getAllPublishedTourRoutes', {
                headers: { Authorization: `Bearer ${token}` } //----->added the token to to authorization header
            });
            const publishedRoutes = response.data.data.tourRoutes || [];
            setRoutes(publishedRoutes);
        } catch (err) {
            setError("There was a problem fetching the published routes. Please try again.");
        }
    };

    // Fetch routes on component mount
    useEffect(() => {
        fetchRoutes();
    }, []);

    // Initialize the map and plot routes
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [10.797379, 60.794533],
            zoom: 9
        });

        // Plot each route on the map once it's loaded
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

                // Calculate distance for the route
                const distance = length({ type: 'Feature', geometry: { type: 'LineString', coordinates: route.coordinates } }, { units: 'kilometers' });
                const popupContent = ReactDOMServer.renderToString(<RoutePopup route={route} distance={distance.toFixed(2)} />);

                const startCoord = route.coordinates[0];
                const endCoord = route.coordinates[route.coordinates.length - 1];
                [startCoord, endCoord].forEach((coord) => {
                    new mapboxgl.Popup({
                        closeOnClick: false,
                        closeButton: false,
                        className: 'route-name-popup'
                    })
                        .setLngLat(coord)
                        .setHTML(popupContent)
                        .addTo(map);
                });
            });
        });

        // Clean up map instance on component unmount
        return () => map.remove();
    }, [routes]);

    // Navigate to dashboard on logo click
    const handleLogoClick = () => {
        navigate('/dashboard');
    }

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="relativeContainer">
            {error && <div className="errorNotification">{error}</div>}
            <button onClick={handleBackClick} className="PublishedRoutesBackButton">Back</button>
            <div className="mapContainer" ref={mapContainerRef}>
                <div className="PublishedRoutes-logo" onClick={handleLogoClick}>TurRuter</div>
            </div>
        </div>
    );
}

export default PublishedRoutes;