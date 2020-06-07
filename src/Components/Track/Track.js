import React from "react";
import "./track.css";
import motorsport from "../../img/motorsport-migos-nickiminaj-cardib.png";

const Track = ({ trackType, trackLocation, track, addToPlaylist, isInPlaylist }) => {
  return (
    <div className="track">
      {trackType === "large" ? <img src={track.img} alt="" /> : ""}
      <div className="track-info">
        <h2 className="track-title">{track.name}</h2>
        <h4 className="track-artist">{track.artist}</h4>
      </div>
      <button onClick={() => addToPlaylist(track)} className={isInPlaylist(track.id) ? "add-or-remove-track-btn track-in-playlist" : "add-or-remove-track-btn"} disabled={isInPlaylist(track.id) ? "disabled" : ""}></button>
    </div>
  );
};

export default Track;
