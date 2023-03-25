import React from "react";
import "./LocationInfo.css";
import { Box, Button, Typography } from "@mui/material";

export default function LocationInfo(props) {
  const handleSaveLocation = () => {
    console.log("handleSaveLocation");
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
        <img src={`icon-${props.type}-blue.png`} width="50px" />
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
          color: "primary.main",
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
        style={{ minWidth: "150px", maxWidth: "100px" }}
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          handleSaveLocation();
        }}
      >
        Save
      </Button>
    </Box>
  );
}
