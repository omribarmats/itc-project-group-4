import { useCallback } from 'react';
import { useEffect } from 'react';
import {  useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux'
import useMap from '../../state/actions/useMap';
import { setDestination } from '../../state/reducers/mapSlice';



export default function HandleMap() {

    const {findLocations} = useMap()

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
        destCoords && moveMapToDestination(destCoords)
    }, [destCoords, moveMapToDestination])

    useEffect(() => { map && map.locate() }, [map])
    useEffect(()=>{map && findLocations()},[map, findLocations])

    return (null)
}