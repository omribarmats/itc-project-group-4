import { useCallback } from 'react';
import { useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux'
import { INITIAL_DESTINATION, INITIAL_FOUND_PLACES } from '../../api/fakeAPI';
import useMapHook from '../../state/actions/useMap';
import { setDestination, setMyPlaces } from '../../state/reducers/mapSlice';



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
                    "park"
                  ]
            }
        })
        dispatch(setLoadingFalse())
    }

    const onLocationError = () => {
        dispatch(setDestination({ name: INITIAL_DESTINATION.name, coords: [INITIAL_DESTINATION.latitude, INITIAL_DESTINATION.longitude] }))
        dispatch(setMyPlaces(INITIAL_FOUND_PLACES))
    }


    if (!map.hasEventListeners('locationfound')) {
        map.on('locationfound', onLocationFound);
      }

      if (!map.hasEventListeners('locationfound')) {
      map.on('locationerror', onLocationError);
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