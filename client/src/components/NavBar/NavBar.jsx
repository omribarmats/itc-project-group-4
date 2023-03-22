import React from 'react'
import UiAppBar from '../../ui/uiKit/componentsUi/UiAppBar'
import UiToolbar from '../../ui/uiKit/layouts/UiToolbar'
import UiBox from '../../ui/uiKit/componentsUi/UiBox'

import NavBarButton from './NavBarButton'


export default function NavBar() {
    return (
        <UiAppBar position="sticky" sx={{backgroundColor:'black'}}>
            <UiToolbar>
                <UiBox px={3}>Logo</UiBox>
                <NavBarButton>Search</NavBarButton>
                <NavBarButton>My Map</NavBarButton>
                <NavBarButton>View</NavBarButton>
            </UiToolbar>
        </UiAppBar>

    )
}
