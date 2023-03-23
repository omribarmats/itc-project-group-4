import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    destination: {
        name: null,
        coords: [48.8566, 2.3522]
    },
    foundPlaces: [],
    myPlaces: []
};


export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setDestination: (state, action) =>{
            state.destination.name = action.payload.name;
            state.destination.coords = action.payload.cords
        },
        setFoundPlaces: (state, action) => {
            console.log('action.payload', action.payload)
            state.foundPlaces = action.payload;
        },
        setMyPlaces: (state, action) => {
            state.myPlaces = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    setDestination,
    setFoundPlaces,
    setMyPlaces,
} = mapSlice.actions

//export const SelectedComponent = (state) => state.modal.components[state.modal.componentKey];

export default mapSlice.reducer

