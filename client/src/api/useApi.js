import React from 'react'
import { PARIS_RESULTS } from './fakeAPI'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setFoundPlaces } from '../state/reducers/mapSlice';
import { setAppError, setLoadingFalse, startApiCall } from '../state/reducers/appSlice';
import { useCallback } from 'react';


export default function useApi() {

    const url = 'http://localhost:3000/filtered-search'
    // const dispatch = useDispatch()

 

    // const handleApiError = useCallback((error) => {
    //     const errorMsg = error.response?.data?.error || error.message;
    //     dispatch(setAppError(errorMsg))
    //     console.log(error);
    //   }, [dispatch])


      const getLocationsWithFilters = useCallback(async (formData) => {
            const res = await axios.post(url, formData)
            return  res.data.data
    },[])


    // const getLocationsWithFiltersOrg = async () => {
    //     try {
    //         dispatch(startApiCall())
    //         console.log('getLocationsWithFilters called')
    //         const res = await axios.post(url, formData)
    //         const data =  JSON.parse('[' + res.data.data + ']')
    //         console.log('data', data)
    //         dispatch(setFoundPlaces(data))
    //         dispatch(setLoadingFalse())
    //     } catch (error) {
    //         handleApiError(error)
    //     }
    // }

    return ({
        getLocationsWithFilters,
    }
    )
}
