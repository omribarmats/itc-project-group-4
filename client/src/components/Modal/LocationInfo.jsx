import React from "react";
import "./LocationInfo.css";

export default function LocationInfo(props) {
  const handleSaveLocation = () => {
    console.log("handleSaveLocation");
  };

  console.log(props.type);

  return (
    <div className="location">
      <h2>
        <img src={"icon-bar-blue.png"} width="40px" />
        {props.name}
      </h2>

      <h3>{props.description}</h3>
      <p>{props.address}</p>
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
