import React from "react";
import "./track.css";
import motorsport from "../../img/motorsport-migos-nickiminaj-cardib.png";

const Track = ({ trackType, data }) => {
  return (
    <div className="track">
      {trackType === "large" ? <img src={data.img} alt="" /> : ""}
      <div className="track-info">
        <h2 className="track-title">{data.name}</h2>
        <h4 className="track-artist">{data.artist}</h4>
      </div>
      <button className="add-or-remove-track"></button>
    </div>
  );
};

export default Track;
