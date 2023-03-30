import React from "react";
import UiAppBar from "../../ui/uiKit/componentsUi/UiAppBar";
import UiToolbar from "../../ui/uiKit/layouts/UiToolbar";
import UiBox from "../../ui/uiKit/componentsUi/UiBox";
import { useState } from "react";

import NavBarButton from "./NavBarButton";
import { MODAL_OPTIONS, openModal, showMyMap } from "../../state/reducers/appSlice";
import { useDispatch, useSelector } from "react-redux";

import logo from '../../images/logo.png';
import { Typography } from "@mui/material";

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
      <UiBox px={3}><img src={logo} width={40} height={40} /></UiBox>
      <Typography sx={{margin: '0 50px 0 -10px'}}>ITC-UNICORN</Typography>
        <NavBarButton 
        onClick={handleSearchClick}
        sx={!showingMyMap ? {color: '#70b9ff', minWidth:'8rem'} : {color: 'white', minWidth:'8rem'}}
        >Search</NavBarButton>
        <NavBarButton 
        sx={showingMyMap ? {color: '#f492f4', minWidth:'8rem'} : {color: 'white', minWidth:'8rem'}}
        onClick={handleMyMapsClick}>My Map</NavBarButton>
      </UiToolbar>
    </UiAppBar>
  );
}
