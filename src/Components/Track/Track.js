import React from "react";
import "./track.css";

const Track = ({ addToMusicQueue, trackType, trackLocation, track, addToPlaylist, isInPlaylist }) => {

  const getSizedImageURL = (url, size) => {
    return url.replace(/{[wh]}/g, size);
  }

  return (
    <div onClick={() => addToMusicQueue(track)} className="track">
      <img className={isInPlaylist(track.id) ? "track-info-img track-in-playlist" : "track-info-img"} src={getSizedImageURL(track.attributes.artwork.url, "600")} alt="" />

      <div className="track-info">
        <h2 className="track-title">{track.attributes.name.length > 20 ? `${track.attributes.name.substring(0,20)}...` : track.attributes.name }</h2>
        <h4 className="track-artist">{track.attributes.artistName}</h4>
      </div>
    </div>
  );
};

export default Track;
