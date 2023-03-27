import React from "react";
import UiAppBar from "../../ui/uiKit/componentsUi/UiAppBar";
import UiToolbar from "../../ui/uiKit/layouts/UiToolbar";
import UiBox from "../../ui/uiKit/componentsUi/UiBox";
import { useState } from "react";

import NavBarButton from "./NavBarButton";
import { MODAL_OPTIONS, openModal } from "../../state/reducers/appSlice";
import { useDispatch } from "react-redux";

import logo from '../../images/logo.png';

export default function NavBar() {
    const [myMaps, setMyMaps] = useState(false);

    const dispatch = useDispatch();

    const handleSearchClick = () => {
        dispatch(openModal(MODAL_OPTIONS.search));
    };

    const handleMyMapsClick = () => {
        setMyMaps(!myMaps);
    };

    return (
        <UiAppBar position="sticky" sx={{ backgroundColor: "#353935" }}>
            <UiToolbar>
                <UiBox px={3}><img src={logo} width={40} height={40} /></UiBox>
                <NavBarButton onClick={handleSearchClick}>Search</NavBarButton>
                <NavBarButton onClick={handleMyMapsClick}>My Map</NavBarButton>
                <NavBarButton>View</NavBarButton>
            </UiToolbar>
        </UiAppBar>
    );
}
