import React from 'react'
import useApi from '../../api/useApi';
import {useDispatch, useSelector} from 'react-redux'
import { setAppError, setLoadingFalse, startApiCall } from '../reducers/appSlice';
import { setDestination, setFoundPlaces } from '../reducers/mapSlice';
import { useCallback } from 'react';


const formData =
{
    query: {
        quantity: 3,
        location: "Mexico",
        places: ["Mall", "Coffee", "Museum"]
    }
}


export default function useMap() {

  
    const {getLocationsWithFilters} = useApi()
    const dispatch = useDispatch()

    const handleApiError = useCallback((error) => {
        const errorMsg = error.response?.data?.error || error.message;
        dispatch(setAppError(errorMsg))
        console.log(error);
      }, [dispatch])


    const  findLocations = useCallback(async () => {
        try {
            dispatch(startApiCall())
            const locations = await getLocationsWithFilters(formData)
            dispatch(setFoundPlaces(locations))
            dispatch(setDestination({
                name: 'New destination', 
                coords:  [locations[0]?.latitude , locations[0]?.longitude]
              }))
            dispatch(setLoadingFalse())
        } catch (error) {
            handleApiError(error)       
        } 
    },[dispatch, getLocationsWithFilters, handleApiError])


   

  return ({
    findLocations
  })
}