import React from 'react'
import useApi from '../../api/useApi';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, setAppError, setLoadingFalse, startApiCall } from '../reducers/appSlice';
import { deleteLocation, setDestination, setFoundPlaces, updateLocation } from '../reducers/mapSlice';
import { useCallback } from 'react';


const initialFormData =
{
  query: {
    quantity: '10',
    location: "Tel Aviv",
    places: ["places"]
  }
}
// const formData =
// {
//     query: {
//         quantity: 3,
//         location: "Mexico",
//         places: ["Mall", "Coffee", "Museum"]
//     }
// }


export default function useMap() {

  const { foundPlaces } = useSelector(state => state.map)
  const { getLocationsWithFilters } = useApi()
  const dispatch = useDispatch()

  const handleApiError = useCallback((error) => {
    let errorMsg = error.response?.data?.error?.error?.message || error.message || error.response?.data?.error;
    if (typeof errorMsg !== 'string' && !(errorMsg instanceof String)) {
      errorMsg = 'An error has ocurred. Please try again'
    }
    dispatch(setAppError(errorMsg))
    console.log(error);
  }, [dispatch])


  const addLocationToMyMap = (location) => {
    const savedLocation = { ...location, isSaved: true };
    dispatch(updateLocation(savedLocation))
  }

  const removeLocationFromMyMap = (location) => {
    const removedLocation = { ...location, isSaved: false };
    dispatch(deleteLocation(removedLocation))
  }

  const findLocations = useCallback(async (formData) => {
    try {
      dispatch(setFoundPlaces([]))
      dispatch(startApiCall())
      const { places, destination } = await getLocationsWithFilters(formData)
      const placesWithKeys = places.map(place => {
        const key = place.name + place.latitude + place.longitude
        return { ...place, key }
      })
      dispatch(setFoundPlaces(placesWithKeys))
      //key: destination.name + destination.latitude  +  destination[0].longitude
      // console.log('destination coords' ,[destination.latitude , destination.longitude])
      dispatch(setDestination({
        name: destination.name,
        coords: [destination.latitude || destination[0].latitude, destination.longitude || destination[0].longitude],
      }))
      dispatch(closeModal())
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }, [dispatch, getLocationsWithFilters, handleApiError])




  return ({
    findLocations,
    addLocationToMyMap,
    removeLocationFromMyMap
  })
}
