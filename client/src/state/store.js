import { configureStore } from '@reduxjs/toolkit'
import appSlice from './reducers/appSlice'
import mapSlice from './reducers/mapSlice'
 
export default configureStore({
    reducer: {
      app: appSlice,
      map: mapSlice
    },
  })
  