import React from "react";
import "./track.css";
import motorsport from "../../img/motorsport-migos-nickiminaj-cardib.png";

const Track = ({ trackType, track, addToPlaylist }) => {
  return (
    <div className="track">
      {trackType === "large" ? <img src={track.img} alt="" /> : ""}
      <div className="track-info">
        <h2 className="track-title">{track.name}</h2>
        <h4 className="track-artist">{track.artist}</h4>
      </div>
      <button onClick={() => addToPlaylist(track)} className="add-or-remove-track"></button>
    </div>
  );
};

export default Track;
