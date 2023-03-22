import React from 'react'
import { PARIS_RESULTS } from './fakeAPI'
import axios from 'axios';


export default function useApi() {

    const url = 'http://localhost:3000/filtered-search'

    const formData =
    {
        query: {
            quantity: 3,
            location: "Mexico",
            places: ["Mall", "Coffee", "Museum"]
        }
    }

    const getLocationsWithFilters = async () => {
        try {
            console.log('getLocationsWithFilters called')
            const res = await axios.post(url, formData)
            // console.log('res', res.data)
           console.log('res', JSON.parse('[' + res.data.data + ']'))
            //return JSON.parse(PARIS_RESULTS)
        } catch (error) {
            console.log(error)
            
        }
    }

    return ({
        getLocationsWithFilters,
    }
    )
}
