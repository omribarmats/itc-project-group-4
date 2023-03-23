import React from "react";
import "./LocationInfo.css";

export default function LocationInfo() {
  const handleSaveLocation = () => {
    console.log("handleSaveLocation");
  };

  return (
    <div className="location">
      <h2>Type</h2>
      <h2>Name</h2>
      <h3>Description</h3>
      <p>Address Address Address Address Address</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSaveLocation();
        }}
      >
        Save
      </button>
    </div>
  );
}
