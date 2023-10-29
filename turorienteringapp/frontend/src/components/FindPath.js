import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import './FindPath.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg';

const FindPath = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const navigate = useNavigate();
    const [startPoint, setStartPoint] = useState('');
    const [endPoint, setEndPoint] = useState('');
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);

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

    // Fetches location suggestions from Mapbox
    const getSuggestions = async (query, setter) => {
        if (!query.trim()) return;

        const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setter(data.features.map(feat => feat.place_name));
    };

    // Navigate back to the dashboard
    const handleLogoClick = () => {
        navigate('/dashboard');
    }

    const handleFindPath = () => {
        /*------> TODO: this logic will be added later -------> */
    }


    return (
        <div className="fullMapContainer">
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
