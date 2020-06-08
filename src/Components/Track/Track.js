import React from "react";
import "./track.css";
import motorsport from "../../img/motorsport-migos-nickiminaj-cardib.png";

const Track = ({ trackType, trackLocation, track, addToPlaylist, isInPlaylist }) => {
  return (
    <div className="track">
      <img onClick={() => addToPlaylist(track)} className={isInPlaylist(track.id) ? "track-info-img track-in-playlist" : "track-info-img"} disabled={isInPlaylist(track.id) ? "disabled" : ""} src={track.img} alt="" />

      <div className="track-info">
        <h2 className="track-title">{ track.name.length > 20 ? `${track.name.substring(0,20)}...` : track.name }</h2>
        <h4 className="track-artist">{track.artist}</h4>
      </div>
    </div>
  );
};

export default Track;
