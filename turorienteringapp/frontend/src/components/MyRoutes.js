import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios'; // Library for making HTTP requests
import './MyRoutes.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

//Color for routes
const colors = ['#F00', '#0F0', '#00F', '#FF0', '#0FF', '#F0F', '#888', '#123456', '#654321', '#ABCDEF'];

const MyRoutes = () => {
    const mapContainerRef = useRef(null); // where to render the map
    const [routes, setRoutes] = useState([]); // manage the fetched routes
 
    /*
     * For fetching data and setting up the map
     */
    useEffect(() => {

        // Function to fetch routes from backend and local storage
        const fetchRoutes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/tourRoutes/');
                const backendRoutes = response.data.tourRoutes || [];

                // Fetching locally stored routes
                const localRoutes = JSON.parse(localStorage.getItem('routes') || '[]').map(route => ({
                    name: route.name,
                    coordinates: route.points.map(point => [point.lng, point.lat])
                }));

                // Merging both sets of routes
                const allRoutes = [...backendRoutes, ...localRoutes];

                setRoutes(allRoutes);
            } catch (error) {
                console.error("Error fetching routes:", error);
            }
        };

        fetchRoutes();
    }, []);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v11',
            center: [10.797379, 60.794533],
            zoom: 9
        });
        
        //displays the user's routes on the map
        map.on('load', () => {
            routes.forEach((route, index) => {
                if (route.coordinates && route.coordinates.length > 0) {
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
                         
                        //Adds a line layer to the map for the current route.
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

                    // Add markers for each coordinate point
                    route.coordinates.forEach((coord, coordIndex) => {
                        new mapboxgl.Marker()
                            .setLngLat(coord)
                            .addTo(map);
                            
                        // Add the route name for the first and last point of each route
                        if(coordIndex === 0 || coordIndex === route.coordinates.length - 1) {
                            new mapboxgl.Popup({
                                closeOnClick: false,
                                closeButton: false,
                                offset: 25
                            })
                            .setLngLat(coord)
                            .setHTML(route.name)
                            .addTo(map);
                        }
                    });
                }
            });
        });

        // Remove the map when the component is closed
        return () => map.remove();

    }, [routes]);

     // Render the map container
    return (
        <div className="mapContainer" ref={mapContainerRef}></div>
    );
}

export default MyRoutes;
