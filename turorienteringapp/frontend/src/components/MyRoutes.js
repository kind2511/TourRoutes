import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { length } from '@turf/turf'; // for distance calculation
import './MyRoutes.css';
import MyRoutesPopup from './MyRoutesPopup'; // MyRoutes info

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

//colors
const colors = ['#F00', '#0F0', '#00F', '#FF0', '#0FF', '#F0F', '#888', '#123456', '#654321', '#ABCDEF'];

const MyRoutes = () => {
    const navigate = useNavigate();
    const mapContainerRef = useRef(null);
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState(null);

    //-------------------------------------------------------------->

    /* 
     *Function to fetch the authenticated user routes 
     */

    // Fetch user's routes if logged in
    const fetchRoutes = async () => {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
            setError("Login required to view routes.");
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/api/v1/tourRoutes/getIndividualUsersTourRoutes', {
                headers: { 'Authorization': `Bearer ${userToken}` }
            });
            setRoutes(response.data.data.tourRoutes || []);
        } catch (err) { // Handle errors if the routes fetch fails
            setError("Error fetching routes.");
            console.error(err);
        }
    };

    // Execute fetchRoutes once  component mount
    useEffect(() => {
        fetchRoutes();
    }, []);


    //-------------------------------------------------------------->

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
                const MyPopupContent = ReactDOMServer.renderToString(<MyRoutesPopup route={route} distance={distance.toFixed(2)} />);

                const startCoord = route.coordinates[0];
                const endCoord = route.coordinates[route.coordinates.length - 1];
                [startCoord, endCoord].forEach((coord) => {
                    new mapboxgl.Popup({
                        closeOnClick: false,
                        closeButton: false,
                        className: 'route-name-popup'
                    })
                        .setLngLat(coord)
                        .setHTML(MyPopupContent)
                        .addTo(map);
                });
            });
        });

        // Clean up map instance on component unmount
        return () => map.remove();
    }, [routes]);


    const handleLogoClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="relativeContainer">
            {error && <div className="errorNotification">{error}</div>}
            <div className="mapContainer" ref={mapContainerRef} />
            <div className="MyRoutes-logo" onClick={handleLogoClick}>TurRuter</div>
        </div>
    );
};

export default MyRoutes;
