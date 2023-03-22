import React from 'react'
import UiAppBar from '../../ui/uiKit/componentsUi/UiAppBar'
import UiToolbar from '../../ui/uiKit/layouts/UiToolbar'
import UiBox from '../../ui/uiKit/componentsUi/UiBox'

import NavBarButton from './NavBarButton'
import { MODAL_OPTIONS, openModal } from '../../state/reducers/appSlice'
import { useDispatch } from 'react-redux'


export default function NavBar() {

   const dispatch = useDispatch()

    const handleSearchClick = () => {
        dispatch(openModal(MODAL_OPTIONS.search))
    }

    return (
        <UiAppBar position="sticky" sx={{backgroundColor:'black'}}>
            <UiToolbar>
                <UiBox px={3}>Logo</UiBox>
                <NavBarButton onClick={handleSearchClick}>Search</NavBarButton>
                <NavBarButton>My Map</NavBarButton>
                <NavBarButton>View</NavBarButton>
            </UiToolbar>
        </UiAppBar>

    )
}
