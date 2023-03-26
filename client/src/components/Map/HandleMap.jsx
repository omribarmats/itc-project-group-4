import { useCallback } from 'react';
import { useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux'
import useMapHook from '../../state/actions/useMap';
import { setDestination } from '../../state/reducers/mapSlice';



export default function HandleMap() {

    const { findLocations } = useMapHook()

    const destCoords = useSelector(state => state.map.destination.coords)
    const dispatch = useDispatch()

    const map = useMap()


    const onLocationFound = async (e) => {
        dispatch(setDestination({ name: 'Your Location', coords: [e.latlng.lat, e.latlng.lng] }))
        await findLocations({
            query: {
                quantity: 3,
                location: { latitude: e.latlng.lat, longitude: e.latlng.lng },
                places: [
                    "Museums",
                    "Start-ups",
                  ]
            }
        })
    }


    if (!map.hasEventListeners('locationfound')) {
        map.on('locationfound', onLocationFound);
      }

    const moveMapToDestination = useCallback((latlng, zoom) => {
        if (!map) return
        const destZoom = zoom || map.getZoom()
        map.flyTo(latlng, destZoom)
    }, [map])

    useEffect(() => {
        destCoords && moveMapToDestination(destCoords)
    }, [destCoords, moveMapToDestination])

    useEffect(() => { map && map.locate() }, [map])

    return (null)
}