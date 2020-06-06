import React from "react";
import "./track.css";
import motorsport from "../../img/motorsport-migos-nickiminaj-cardib.png";

const Track = ({ trackType }) => {
  return (
    <div className="track">
      {trackType === "large" ? <img src={motorsport} alt="" /> : ""}
      <div className="track-info">
        <h2 className="track-title">Motorsport</h2>
        <h4 className="track-artist">Migos, Nicki Minaj, Cardi B</h4>
      </div>
      <button className="add-or-remove-track"></button>
    </div>
  );
};

export default Track;
