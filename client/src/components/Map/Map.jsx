import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // import the CSS for Leaflet
import L from 'leaflet';
import { useEffect } from 'react';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import LocationInfo from '../Modal/LocationInfo';
import { useSelector } from 'react-redux'
import HandleMap from './HandleMap';
import { INITIAL_MAP_COORDS, INITIAL_MAP_ZOOM } from '../../config/config';


export default function LeafletMap() {

  const { foundPlaces} = useSelector(state => state.map)


  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);

  const handleMarkerClick = (locationName) => {
    console.log(`The location ${locationName} has been saved`)
  }

  const CustomPopup = ({ name, why_should_i_go_there }) => (
    <Popup>
      <div>{name}</div>
      <div>{why_should_i_go_there}</div>
      <LocationInfo />
    </Popup>
  );

  const mapStyle = { height: '100%' }; // set the desired height in pixels

  return (
    <>
      <MapContainer center={INITIAL_MAP_COORDS} zoom={INITIAL_MAP_ZOOM} scrollWheelZoom={true} style={mapStyle}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {foundPlaces && foundPlaces.map(location => {
         return  <Marker key={location.name} position={[location?.latitude , location?.longitude]} onClick={handleMarkerClick}>
            <CustomPopup {...location}/>
          </Marker>
 } )}
        <HandleMap />
      </MapContainer>
    </>
  )
}


