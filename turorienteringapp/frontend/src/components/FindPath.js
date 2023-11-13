import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import './FindPath.css';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

const FindPath = () => {
    // Refrences to map container_map instance_ navigation hook
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const navigate = useNavigate();

    //State varirables to input start/end point & location suggestions start/end
    const [startPoint, setStartPoint] = useState('');
    const [endPoint, setEndPoint] = useState('');
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);

    // Initialization of the map
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [10.797379, 60.794533],
            zoom: 9
        });

        mapRef.current = map;

        return () => map.remove();
    }, []);

    // Fetches location suggestions from Mapbox
    const getSuggestions = async (query, setter) => {
        if (!query.trim()) return;

        const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setter(data.features.map(feat => feat.place_name));
    };

    //fetch the coordinates from the given address name
    const getCoordinatesFromName = async (name) => {
        const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(name)}.json?access_token=${mapboxgl.accessToken}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.features[0].center;
    };
    // fetch drive route between two put of cordinates
    const getRoute = async (start, end) => {
        try {
            const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.code !== "Ok") {
                throw new Error(`Failed to fetch route: ${data.code}`);
            }
            return data.routes[0].geometry.coordinates;
        } catch (error) {
            console.error('Error in getRoute:', error);
            throw error;
        }
    };

    /*
     * Function find path button, fetch the routes and update map
     */
    const handleFindPath = async () => {
        try {
            const startCoords = await getCoordinatesFromName(startPoint);
            const endCoords = await getCoordinatesFromName(endPoint);
            const route = await getRoute(startCoords, endCoords);

            if (mapRef.current.getSource('route')) {
                mapRef.current.removeLayer('route');
                mapRef.current.removeSource('route');
            }

            mapRef.current.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: route
                    }
                }
            });

            mapRef.current.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {},
                paint: {
                    'line-width': 5,
                    'line-color': '#ff0000'
                }
            });

            // Adjust map to fit the route
            const bounds = route.reduce((bounds, coord) => {
                return bounds.extend(coord);
            }, new mapboxgl.LngLatBounds(route[0], route[0]));

            mapRef.current.fitBounds(bounds, {
                padding: 20
            });

        } catch (error) {
            console.error('Error in handleFindPath:', error);
        }
    };

    // Navigate back to the dashboard
    const handleLogoClick = () => {
        navigate('/dashboard');
    };

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    //JSX for render the component
    return (
        <div className="fullMapContainer">
            <button onClick={handleBackClick} className="FindPathBackButton">Back</button>
            <div ref={mapContainerRef} className="fullMap">
                <div className="findPath-logo" onClick={handleLogoClick}>
                    TurRuter
                </div>
                <div className="pathInputContainer">
                    <input
                        className="pathInput"
                        type="text"
                        placeholder="Start Point"
                        value={startPoint}
                        onChange={e => {
                            setStartPoint(e.target.value);
                            getSuggestions(e.target.value, setStartSuggestions);
                        }}
                        list="startSuggestions"
                    />
                    <datalist id="startSuggestions">
                        {startSuggestions.map(suggestion => (
                            <option key={suggestion} value={suggestion} />
                        ))}
                    </datalist>
                    <input
                        className="pathInput"
                        type="text"
                        placeholder="End Point"
                        value={endPoint}
                        onChange={e => {
                            setEndPoint(e.target.value);
                            getSuggestions(e.target.value, setEndSuggestions);
                        }}
                        list="endSuggestions"
                    />
                    <datalist id="endSuggestions">
                        {endSuggestions.map(suggestion => (
                            <option key={suggestion} value={suggestion} />
                        ))}
                    </datalist>
                    <button className="findPathButton" onClick={handleFindPath}>
                        Find Path
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FindPath;