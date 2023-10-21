import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import './NewRoute.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg'; 

//New Rute function
const NewRoute = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [points, setPoints] = useState([]);
    const [isCreatingRoute, setIsCreatingRoute] = useState(false);
    const [markers, setMarkers] = useState([]);
    const navigate = useNavigate();  // Navigation function

    // Initialization of the map
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v11',// new style 
            center: [10.797379, 60.794533],
            zoom: 9
        });

        mapRef.current = map;

        return () => map.remove();
    }, []);

    // Click listener
    useEffect(() => {
        if (!mapRef.current || !isCreatingRoute) return;

        const handleClick = (e) => {
            const newPoint = e.lngLat;
            const currentPoints = [...points, newPoint];
            setPoints(currentPoints);

            // Create a marker for each point and add it to the markers array
            const marker = new mapboxgl.Marker()
                .setLngLat([newPoint.lng, newPoint.lat])
                .addTo(mapRef.current);
            setMarkers(prevMarkers => [...prevMarkers, marker]);

            const lineCoordinates = currentPoints.map(point => [point.lng, point.lat]);

            if (mapRef.current.getSource('route')) {
                mapRef.current.getSource('route').setData({
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": lineCoordinates
                    }
                });
            } else {
                mapRef.current.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: lineCoordinates
                        }
                    }
                });
                mapRef.current.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#888',
                        'line-width': 8
                    }
                });
            }
        };

        // right click to remove the lines 
        const handleRightClick = (e) => {
            e.preventDefault(); // Prevent the browser context menu

            if (points.length === 0) return; // Nothing to undo

            // Remove last point
            setPoints(points.slice(0, -1));

            // Remove the last marker
            const lastMarker = markers[markers.length - 1];
            lastMarker.remove();
            setMarkers(markers.slice(0, -1));

            // Update route line on the map
            const lineCoordinates = points.slice(0, -1).map(point => [point.lng, point.lat]);

            if (lineCoordinates.length > 0) {
                mapRef.current.getSource('route').setData({
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": lineCoordinates
                    }
                });
            } else {
                // If no points are left, remove the route line from the map
                if (mapRef.current.getLayer('route')) {
                    mapRef.current.removeLayer('route');
                    mapRef.current.removeSource('route');
                }
            }
        };

        mapRef.current.on('click', handleClick);
        mapRef.current.on('contextmenu', handleRightClick); // Add right-click listener

        return () => {
            mapRef.current.off('click', handleClick);
            mapRef.current.off('contextmenu', handleRightClick); // Cleanup right-click listener
        };
    }, [isCreatingRoute, points, markers]);
    
    //functoin for save the route 
    const handleSaveRoute = () => {
        if (points.length < 2) {
            alert('Please select at least two points to form a route.');
            return;
        }

        const name = prompt("Enter a name for this route:", "Route 1");
        if (!name) {
            alert('Please enter a route name.');
            return;
        }

        const existingRoutes = JSON.parse(localStorage.getItem('routes') || '[]');
        existingRoutes.push({ name, points });
        localStorage.setItem('routes', JSON.stringify(existingRoutes));

        setPoints([]);
        setIsCreatingRoute(false);

        if (mapRef.current.getLayer('route')) {
            mapRef.current.removeLayer('route');
            mapRef.current.removeSource('route');
        }

        // Clearing markers after saving the route
        markers.forEach(marker => marker.remove());
        setMarkers([]);

        alert('Route saved!');
    };
        
    //Functoin cancel button
    const handleCancelRoute = () => {
        setPoints([]);
        setIsCreatingRoute(false);

        if (mapRef.current.getLayer('route')) {
            mapRef.current.removeLayer('route');
            mapRef.current.removeSource('route');
        }

        // Clearing markers when cancelling the route creation
        markers.forEach(marker => marker.remove());
        setMarkers([]);

        alert('Route creation cancelled!');
    };
    const handleLogoClick = () => {
        navigate('/dashboard');
    }
/*----------------------------------------------------------------------------------> */
 /* Render the elements */
 return (
    <div style={{ position: 'relative' }}>
        <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }}>
            
            {isCreatingRoute ? (
                <>
                    <button 
                        className="saveButton"
                        onClick={handleSaveRoute} 
                        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}
                    >
                        Save Route
                    </button>
                    <button 
                        className="cancelButton"
                        onClick={handleCancelRoute} 
                        style={{ position: 'absolute', top: '50px', left: '10px', zIndex: 1 }}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <div style={{ display: 'flex', position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
                    {/* Logo addition */}
                    <div 
                        className="newrute-logo" 
                        onClick={handleLogoClick} 
                        style={{ marginRight: '10px', cursor: 'pointer' }}
                    >
                        TurRuter
                    </div>
                    
                    <button
                        onClick={() => setIsCreatingRoute(true)}
                    >
                        Start a Route
                    </button>
                </div>
            )}
        </div>
    </div>
);
}

export default NewRoute;