import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { length } from '@turf/turf'; // for distance calculation
import './MyRoutes.css';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

// Colors for route lines
const colors = ['#F00', '#0F0', '#00F', '#FF0', '#0FF', '#F0F', '#888', '#123456', '#654321', '#ABCDEF'];

const MyRoutes = () => {
    const navigate = useNavigate();
    const mapContainerRef = useRef(null);
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState(null);

    //-------------------------------------------------------------->

    // Function to delete a route
    const deleteRoute = async (routeId) => {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
            setError("Login required to perform this action.");
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/api/v1/tourRoutes/${routeId}`, {
                headers: { 'Authorization': `Bearer ${userToken}` }
            });
            // Refresh routes after delete route
            await fetchRoutes();
        } catch (err) {
            setError("Error deleting route.");
            console.error(err);
        }
    };

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
        } catch (err) {
            // Handle errors if the routes fetch fails
            setError("Error fetching routes.");
            console.error(err);
        }
    };

    // Execute fetchRoutes once component mounts
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

        //----------------------------------------------------------->

        // Function to create popups for each route
        const createPopups = () => {
            routes.forEach((route, index) => {
                if (!route.coordinates || route.coordinates.length === 0) {
                    console.warn("Route without valid coordinates:", route);
                    return;
                }

                // Calculate the distance of each route
                const distance = length(
                    { type: 'Feature', geometry: { type: 'LineString', coordinates: route.coordinates } },
                    { units: 'kilometers' }
                );

                // Create the popup div and its contents
                const popupDiv = document.createElement('div');
                popupDiv.className = 'my-routes-popup';

                //Route name
                const routeNameDiv = document.createElement('div');
                routeNameDiv.className = 'my-routes-name';
                routeNameDiv.textContent = route.name;
                popupDiv.appendChild(routeNameDiv);

                //Route distance
                const routeDistanceDiv = document.createElement('div');
                routeDistanceDiv.className = 'my-routes-distance';
                routeDistanceDiv.textContent = `${distance.toFixed(2)} km`;
                popupDiv.appendChild(routeDistanceDiv);

                //Delete button
                const deleteButton = document.createElement('button');
                deleteButton.className = 'my-routes-delete-btn';
                deleteButton.textContent = 'Delete Route';
                deleteButton.onclick = () => {
                    if (window.confirm("Are you sure you want to delete this route?")) {
                        deleteRoute(route._id);
                    }
                };
                popupDiv.appendChild(deleteButton);

                //------------------------------------------------------->

                // Add popup to map
                new mapboxgl.Popup({
                    closeOnClick: false,
                    closeButton: false,
                    className: 'route-popup'
                })
                    .setLngLat(route.coordinates[0])
                    .setDOMContent(popupDiv)
                    .addTo(map);
            });
        };

        //----------------------------------------------------------->

        // Plot each route on the map once it's loaded
        map.on('load', () => {
            routes.forEach((route, index) => {
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
            });

            createPopups(); // Initial popup creation
        });

        //when the map is moved or zoomed to ensure correct positioning
        map.on('moveend', createPopups); // Recreate popups on map movement
        map.on('zoomend', createPopups); // Recreate popups on zoom

        return () => map.remove(); // Clean up map on component unmount
    }, [routes]);

    /*
    * Event handlers
    */
    const handleLogoClick = () => { navigate('/dashboard'); };
    const handleBackClick = () => { navigate('/dashboard'); };

    /*
    *Rendered JSX
    */
    return (
        <div className="relativeContainer">
            {error && <div className="errorNotification">{error}</div>}
            <div className="mapContainer" ref={mapContainerRef} />
            <div className="MyRoutes-logo" onClick={handleLogoClick}>TurRuter</div>
            <button onClick={handleBackClick} className="MyRoutesBackButton">Back</button>
        </div>
    );
};

export default MyRoutes;
