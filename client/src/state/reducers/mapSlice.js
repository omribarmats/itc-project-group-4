import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    destination: {
        name: null,
        coords: [null, null]
    },
    foundPlaces: [],
    myPlaces: []
};


export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setDestination: (state, action) =>{
            state.modal.destination.name = action.payload.name;
            state.modal.destination.cords = action.payload.cords
        },
        setFoundPlaces: (state, action) => {
            state.modal.foundPlaces = action.payload;
        },
        setMyPlaces: (state, action) => {
            state.modal.myPlaces = action.payload;
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

