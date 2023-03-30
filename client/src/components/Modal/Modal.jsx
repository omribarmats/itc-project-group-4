import React from "react";
import UiDialog from "../../ui/uiKit/componentsUi/UiDialog";
import SearchForm from "./SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../state/reducers/appSlice";
import Lottie from 'lottie-react'
import AirplaneAnimation from './AirplaneAnimation.json'
import { UiFlexCol } from "../../ui/uiKit/layouts/UiFlex";
import { Typography } from "@mui/material";
import UiBox from "../../ui/uiKit/layouts/UiBox";
import { textAlign } from "@mui/system";


export default function Modal() {
  const { isOpen } = useSelector((state) => state.app.modal);
  const { loading } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const handleOnClose = () => {
    console.log("close modal");
    dispatch(closeModal());
  };



  return (
    !loading ? (
      <UiDialog open={isOpen} onClose={handleOnClose} >
        <SearchForm />
      </UiDialog>
    ) : (
      <UiDialog open={isOpen}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <UiBox sx={{ width: '300px', overflow: 'hidden' }}>


          <Lottie animationData={AirplaneAnimation} loop={true} />;
          <Typography variant="h6" sx={{ color: 'white', marginTop: '-50px', textAlign: 'center' }}>
            Loading...
          </Typography>

        </UiBox>
        {/* <UiFlexCol alignItems='center' justifyContent='center'
        sx={{
          height: '150px',
          width: '150px',
          backgroundImage: "url('./assets/walking-dog.gif')",
          backgroundSize: '200px 200px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom center',
          borderRadius: '80px',
          overflow: 'hidden',
          border: '5px solid black'
        }}
      >
        <FontAlt bold mt='60px' variant='h4' >Loading</FontAlt>
      </UiFlexCol> */}
      </UiDialog>
    )


  );
}
