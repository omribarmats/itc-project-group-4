import { createSlice } from "@reduxjs/toolkit"
import LocationInfo from "../../components/Modal/LocationInfo";
import SearchForm from "../../components/Modal/SearchForm";


export const MODAL_OPTIONS = {
    search: 1,
    location: 2,
}

export const MODAL_COMPONENTS = {
    [MODAL_OPTIONS.login] : <SearchForm/>,
    [MODAL_OPTIONS.location] : <LocationInfo/>,
}

const initialState = {
    showingMyMap: false,
    modal: {
        isOpen: false,
        selectedModal: null,
    },
    loading: true,
    error: null,
};


export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        openModal: (state, action) =>{
            state.modal.selectedModal = action.payload;
            state.modal.isOpen = true;
        },
        closeModal: (state) => {
            state.modal.modalOption = null;
            state.modal.isOpen = false;
            state.modal.componentKey = null;
        },
        startApiCall: state => {
            state.loading = true
            state.error = null
        },
        setAppError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearAppError: (state) => {
            state.error = null;
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
        resetAppStatus: (state) => {
            state.loading = false;
            state.error = false;
        },
        showMyMap: (state, action) => {
            state.showingMyMap = action.payload? true: false;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    openModal,
    closeModal,
    startApiCall,
    setAppError,
    clearAppError,
    setLoadingFalse,
    setUserUpdatedInfo,
    resetAppStatus,
    showMyMap
} = appSlice.actions

//export const SelectedComponent = (state) => state.modal.components[state.modal.componentKey];

export default appSlice.reducer

