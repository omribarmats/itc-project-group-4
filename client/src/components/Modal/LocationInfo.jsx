import React from "react";
import "./LocationInfo.css";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavBar } from "../NavBar/NavBar.jsx";

export default function LocationInfo(props) {
  const [savedArray, setSavedArray] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const { foundPlaces } = useSelector((state) => state.map);

  const handleSaveLocation = () => {
    setIsSaved(!isSaved);
  };

  return (
    <Box
      className="location"
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          m: 0,
          p: 0,
        }}
      >
        <img
          src={`icon-${props.type}-${isSaved ? "purple" : "blue"}.png`}
          width="50px"
        />
        <Typography
          variant="h2"
          sx={{
            m: 1,
            fontWeight: 600,
            fontSize: 30,
          }}
        >
          {props.name}
        </Typography>
      </Box>
      <Typography
        variant="p"
        sx={{
          m: 1,
          mb: 0,
          fontWeight: 600,
          fontSize: 12,
          color: isSaved ? "Purple" : "#1976D2",
        }}
      >
        {/* {props.type.charAt(0).toUpperCase() + props.type.slice(1)} */}
        {props.type}
      </Typography>
      <Typography
        variant="p"
        sx={{
          m: 1,
          fontWeight: 200,
          fontSize: 15,
        }}
      >
        {props.description}
      </Typography>

      <Button
        sx={{ alignSelf: "center", m: 1 }}
        style={{
          minWidth: "150px",
          maxWidth: "100px",
          backgroundColor: isSaved ? "Purple" : "#1976D2",
        }}
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          handleSaveLocation();
        }}
      >
        {isSaved ? "Remove" : "Save"}
      </Button>
    </Box>
  );
}
