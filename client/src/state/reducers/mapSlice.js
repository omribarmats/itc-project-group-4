import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: {
    name: null,
    coords: null,
  },
  foundPlaces: [],
  myPlaces: [],
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination.name = action.payload.name;
      state.destination.coords = action.payload.coords;
    },
    setFoundPlaces: (state, action) => {
      state.foundPlaces = action.payload;
    },
    setMyPlaces: (state, action) => {
      state.myPlaces = action.payload;
    },
    updateLocation: (state, action) => {
        state.foundPlaces = state.foundPlaces.map( place => {
            if (place.key === action.payload.key) {
                return action.payload
            }
            return place
        })
        state.myPlaces = [...state.myPlaces, action.payload ]
    },
    deleteLocation: (state, action) => {
        state.foundPlaces = state.foundPlaces.map( place => {
            if (place.key === action.payload.key) {
                return action.payload
            }
            return place
        })
        state.myPlaces = state.myPlaces.filter( place => {
           return place.key !== action.payload.key})}
  },
});

// Action creators are generated for each case reducer function
export const { setDestination, deleteLocation, setFoundPlaces, setMyPlaces, updateLocation  } = mapSlice.actions;

//export const SelectedComponent = (state) => state.modal.components[state.modal.componentKey];

export default mapSlice.reducer;
