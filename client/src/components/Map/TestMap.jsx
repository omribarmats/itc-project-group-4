import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux'
import { INITIAL_MAP_COORDS, INITIAL_MAP_ZOOM } from '../../config/config';
import { setDestination } from '../../state/reducers/mapSlice';


function MoveMap() {

    const destCoords = useSelector(state => state.map.destination.coords)

    const dispatch = useDispatch()

    const map = useMapEvents({
        locationfound(e) {
            dispatch(setDestination({ name: 'Your Location', coords: [e.latlng.lat, e.latlng.lng] }))
        }
    })

    const moveMapToDestination = useCallback((latlng, zoom) => {
        if (!map) return
        const destZoom = zoom || map.getZoom()
        map.flyTo(latlng, destZoom)
    }, [map])

    useEffect(() => {
        destCoords.length && moveMapToDestination(destCoords)
    }, [destCoords, moveMapToDestination])

    useEffect(() => { map && map.locate() }, [map])

    return (null)
}

export default function TestMap() {

    // const destinationLatLng = useSelector(state => state.map.destination.coords)

    return (
        <MapContainer
            style={{ height: '100%' }}
            center={INITIAL_MAP_COORDS}
            zoom={INITIAL_MAP_ZOOM}
            scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MoveMap />
        </MapContainer>
    )
}


