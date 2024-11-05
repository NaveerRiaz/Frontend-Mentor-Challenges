import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import markerIcon from '../assets/icon-location.svg';

const customIcon = new L.Icon({
  iconUrl: markerIcon, 
  iconSize: [46, 56],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const MapComponent = ({location}) => {

  const { lat, lng } = location;

  // Component to update the map view when coordinates change
  const MapViewUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }, [lat, lng, map]);

    return null;
  };

  return (
    <MapContainer
      center={[lat? lat : 51.505, lng? lng : -0.09]} 
      zoom={50} // Initial zoom level
      style={{height: "calc(100vh - 250px)", width: "100%", zIndex: "0" }}
      zoomControl= {false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap tile layer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={[lat? lat : 51.505, lng? lng : -0.09]} icon={customIcon}></Marker>
      <MapViewUpdater /> {/* This updates the map view */}
    </MapContainer>
  );
};

export default MapComponent;
