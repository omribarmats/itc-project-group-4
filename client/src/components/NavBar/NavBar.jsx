import React from "react";
import UiAppBar from "../../ui/uiKit/componentsUi/UiAppBar";
import UiToolbar from "../../ui/uiKit/layouts/UiToolbar";
import UiBox from "../../ui/uiKit/componentsUi/UiBox";
import { useState } from "react";

import NavBarButton from "./NavBarButton";
import { MODAL_OPTIONS, openModal, showMyMap } from "../../state/reducers/appSlice";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {

  const dispatch = useDispatch();
  const {showingMyMap} = useSelector(state => state.app)

  const handleSearchClick = () => {
    dispatch(showMyMap(false));
    console.log('showingMap', showingMyMap)
    dispatch(openModal(MODAL_OPTIONS.search));
  };

  const handleMyMapsClick = () => {
    dispatch(showMyMap(true));
    console.log('showingMap', showingMyMap)
  };

  return (
    <UiAppBar position="sticky" sx={{ backgroundColor: "black" }}>
      <UiToolbar>
        <UiBox px={3}>Logo</UiBox>
        <NavBarButton 
        onClick={handleSearchClick}
        sx={!showingMyMap ? {color: '#70b9ff'} : {color: 'white'}}
        >Search</NavBarButton>
        <NavBarButton 
        sx={showingMyMap ? {color: '#f492f4'} : {color: 'white'}}
        onClick={handleMyMapsClick}>My Map</NavBarButton>
        <NavBarButton>View</NavBarButton>
      </UiToolbar>
    </UiAppBar>
  );
}
