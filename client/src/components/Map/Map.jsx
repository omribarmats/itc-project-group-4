import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // import the CSS for Leaflet
import L from "leaflet";
import { useEffect } from "react";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import LocationInfo from "../Modal/LocationInfo";
import { useSelector } from "react-redux";
import HandleMap from "./HandleMap";
import { INITIAL_MAP_COORDS, INITIAL_MAP_ZOOM } from "../../config/config";

export default function LeafletMap() {
  const { foundPlaces, myPlaces } = useSelector((state) => state.map);
  const {showingMyMap} = useSelector(state => state.app)


  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: "icon-cafe-blue.png",
      shadowUrl: markerShadow,
      iconSize: [50, 50],
      popupAnchor: [13, -20],
    });
  }, []);


  const typeIcon = (type, isSaved) =>{ 
  const iconTypes = ['bar','cafe','hostel','hotel','mall','market','museum','park','restaurant','start-up']
  const hasIconType = iconTypes.includes(type.toLowerCase())
  const color = isSaved? 'purple' : 'blue'
   return L.icon({
      iconUrl: hasIconType ?  `icon-${type}-${color}.png` : `icon-${color}.png` ,
      iconSize: [50, 50],
      popupAnchor: [0, -20],
    });
  }


  const handleMarkerClick = (locationName) => {
    console.log(`The location ${locationName} has been saved`);
  };

  const CustomPopup = ({
    name,
    why_should_i_go_there,
    type,
    latitude,
    longitude,
    location
  }) => (
    <Popup>
      <LocationInfo
        location={location}
        name={name}
        description={why_should_i_go_there}
        type={type}
        position={[latitude, longitude]}
      />
    </Popup>
  );

  const mapStyle = { height: "100%" }; // set the desired height in pixels

  return (
    <>
      <MapContainer
        center={INITIAL_MAP_COORDS}
        zoom={INITIAL_MAP_ZOOM}
        scrollWheelZoom={true}
        style={mapStyle}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showingMyMap? (
            myPlaces?.map((location) => {
              return (
                <Marker
                  isSaved={location?.isSaved}
                  key={location?.key}
                  position={[location?.latitude, location?.longitude]}
                  onClick={handleMarkerClick}
                  icon={typeIcon(location.type, location.isSaved)}
                >
                  <CustomPopup {...location} location={location} />
                </Marker>
              );
            })


        ):(
          foundPlaces?.map((location) => {
            return (
              <Marker
                isSaved={location?.isSaved}
                key={location?.key}
                position={[location?.latitude, location?.longitude]}
                onClick={handleMarkerClick}
                icon={typeIcon(location.type, location.isSaved)}
              >
                <CustomPopup {...location} location={location} />
              </Marker>
            );
          })

        )
        
        }
        <HandleMap />
      </MapContainer>
    </>
  );
}
