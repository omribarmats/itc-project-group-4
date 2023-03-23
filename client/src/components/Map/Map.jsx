import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // import the CSS for Leaflet
import L from "leaflet";
import { useEffect } from "react";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import useApi from "../../api/useApi";
import LocationInfo from "../Modal/LocationInfo";

const top10Locations = [
  {
    name: "Eiffel Tower",
    latlng: [48.8584, 2.2945],
    ranking: 4.6,
  },
  {
    name: "Louvre Museum",
    latlng: [48.8606, 2.3376],
    ranking: 4.6,
  },
  {
    name: "Notre-Dame Cathedral",
    latlng: [48.8529, 2.3499],
    ranking: 4.6,
  },
  {
    name: "Montmartre",
    latlng: [48.8867, 2.3431],
    ranking: 4.6,
  },
  {
    name: "Arc de Triomphe",
    latlng: [48.8738, 2.295],
    ranking: 4.6,
  },
  {
    name: "Champs-Élysées",
    latlng: [48.8698, 2.3078],
    ranking: 4.5,
  },
  {
    name: "Palace of Versailles",
    latlng: [48.8048, 2.1204],
    ranking: 4.6,
  },
  {
    name: "Musée d'Orsay",
    latlng: [48.8599, 2.3266],
    ranking: 4.6,
  },
  {
    name: "Sainte-Chapelle",
    latlng: [48.8554, 2.3447],
    ranking: 4.6,
  },
  {
    name: "Centre Pompidou",
    latlng: [48.8606, 2.3522],
    ranking: 4.5,
  },
];

export default function LeafletMap() {
  const { getLocationsWithFilters } = useApi();

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
    getLocationsWithFilters();
  }, []);

  const handleMarkerClick = (locationName) => {
    console.log(`The location ${locationName} has been saved`);
  };

  const CustomPopup = ({ googleRank, locationName }) => (
    <Popup minWidth="100px">
      <LocationInfo />
      {/* <div>
        <h3>Visit  {locationName}</h3>
        <p>Google ranking: {googleRank}</p>
        <button onClick={()=>handleMarkerClick(locationName)}>Add to my map</button>
      </div> */}
    </Popup>
  );

  const mapStyle = { height: "100vh" }; // set the desired height in pixels

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={13}
      scrollWheelZoom={false}
      style={mapStyle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {top10Locations.map((location) => (
        <Marker
          key={location.name}
          position={location.latlng}
          onClick={handleMarkerClick}
        >
          <CustomPopup
            googleRank={location.ranking}
            locationName={location.name}
          />
        </Marker>
      ))}
    </MapContainer>
  );
}
