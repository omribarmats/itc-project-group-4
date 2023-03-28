import { useCallback } from 'react';
import { useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux'
import { INITIAL_DESTINATION, INITIAL_FOUND_PLACES } from '../../api/fakeAPI';
import useMapHook from '../../state/actions/useMap';
import { setLoadingFalse } from '../../state/reducers/appSlice';
import { setDestination, setMyPlaces } from '../../state/reducers/mapSlice';
import L from "leaflet";


export default function HandleMap() {

    const { findLocations } = useMapHook()

    const destCoords = useSelector(state => state.map.destination.coords)
    const {foundPlaces} = useSelector(state => state.map)

    const {loading} = useSelector(state => state.app)
    const dispatch = useDispatch()

    const map = useMap()


    const onLocationFound = async (e) => {
        if (!loading) return
        dispatch(setDestination({ name: 'Your Location', coords: [e.latlng.lat, e.latlng.lng] }))
        await findLocations({
            query: {
                quantity: 3,
                location: { latitude: e.latlng.lat, longitude: e.latlng.lng },
                places: [
                    "Museums",
                    "Start-ups",
                    "Parksç"
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


    const moveMapToFoundPlaces = useCallback((latlng) => {
        if (!map) return
        if(foundPlaces.length > 0) {
            const bounds = L.latLngBounds(foundPlaces.map(location => [location.latitude, location.longitude])).pad(0.2);
            //const paddedBounds = bounds.pad(0.1)
           // console.log('paddedBounds',paddedBounds)
            map.flyToBounds(bounds);
            //map.getBounds().pad(.2)
            //const paddedBounds = bounds.pad(0.1)
            //map.flyToBounds(paddedBounds);
        } else {
            return
        }
    }, [map, foundPlaces])

    
    

    useEffect(() => {
        destCoords && foundPlaces && moveMapToFoundPlaces(destCoords)
    }, [destCoords, foundPlaces, moveMapToDestination, moveMapToFoundPlaces])

    useEffect(() => { map && map.locate() }, [map])

    return (null)
}