import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import axios from "axios"; // Used to make HTTP requests
import "./NewRoute.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hyaXNhMjUxMSIsImEiOiJjbGtkcjRhNnkwa3JhM2t1ODFtbHppd2JmIn0.9DC6eUXzdFclnzb_3LCOtg";

//New Rute function
const NewRoute = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [isCreatingRoute, setIsCreatingRoute] = useState(false);
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate(); // Navigation function

  // Initialization of the map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [10.797379, 60.794533],
      zoom: 9,
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
      setMarkers((prevMarkers) => [...prevMarkers, marker]);

      const lineCoordinates = currentPoints.map((point) => [
        point.lng,
        point.lat,
      ]);

      if (mapRef.current.getSource("route")) {
        mapRef.current.getSource("route").setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: lineCoordinates,
          },
        });
      } else {
        mapRef.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: lineCoordinates,
            },
          },
        });
        mapRef.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
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
      const lineCoordinates = points
        .slice(0, -1)
        .map((point) => [point.lng, point.lat]);

      if (lineCoordinates.length > 0) {
        mapRef.current.getSource("route").setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: lineCoordinates,
          },
        });
      } else {
        // If no points are left, remove the route line from the map
        if (mapRef.current.getLayer("route")) {
          mapRef.current.removeLayer("route");
          mapRef.current.removeSource("route");
        }
      }
    };

    mapRef.current.on("click", handleClick);
    mapRef.current.on("contextmenu", handleRightClick); // Add right-click listener

    return () => {
      mapRef.current.off("click", handleClick);
      mapRef.current.off("contextmenu", handleRightClick); // Cleanup right-click listener
    };
  }, [isCreatingRoute, points, markers]);

  //------------------------------------------------------------------->

  /* Function to handle saving a new route */
  const handleSaveRoute = async () => {
    // Check if there are at least 2 points to form a route
    if (points.length < 2) {
      alert("Please select at least two points to form a route.");
      return;
    }

    // Prompt the user to enter a name for the route
    const name = prompt("Enter a name for this route:", "Route 1");

    // Check if a route name was provided
    if (!name) {
      alert("Please enter a route name.");
      return;
    }

    // Format the points data as an array of arrays of numbers
    const coordinates = points.map((point) => [point.lng, point.lat]);

    // Ask the user if they would like their route to be published
    const publishConfirmation = window.confirm("Would you like your route to be published?");
    const published = publishConfirmation ? true : false; //publish status based on user choice

    // Send a POST request to the backend to save the route
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/tourRoutes/newTourRoute",
        { name, coordinates, published },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );

      // Check the response status from the backend
      if (response.data && response.data.status === "success") {
        alert(`Route "${name}" saved successfully as ${published ? "published" : "not published"}.`);
      } else {
        alert("There was an issue saving the route to the backend.");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      alert("An error occurred while saving the route: " + error.message);
      return;
    }

    // Reset points and markers
    setPoints([]);
    setIsCreatingRoute(false);

    // Remove the route from the map
    if (mapRef.current.getLayer("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    // Remove markers
    markers.forEach((marker) => marker.remove());
    setMarkers([]);
  };

  //------------------------------------------------------------------->

  //Functoin cancel button
  const handleCancelRoute = () => {
    setPoints([]);
    setIsCreatingRoute(false);

    if (mapRef.current.getLayer("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    // Clearing markers when cancelling the route creation
    markers.forEach((marker) => marker.remove());
    setMarkers([]);

    alert("Route creation cancelled!");
  };
  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };
  /*----------------------------------------------------------------------------------> */
  /* Render the elements */
  return (
    <div className="relativeContainer">
      <button onClick={handleBackClick} className="NewRouteBackButton">Back</button>
      <div ref={mapContainerRef} className="mapContainer">
        {isCreatingRoute ? (
          <>
            <button className="saveButton" onClick={handleSaveRoute}>Save Route</button>
            <button className="cancelButton" onClick={handleCancelRoute}>Cancel</button>
          </>
        ) : (
          <>
            <div className="controlContainer">
              <button onClick={() => setIsCreatingRoute(true)}>Start a Route</button>
            </div>
            <div className="newrute-logo" onClick={handleLogoClick}>
              TurRuter
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewRoute;