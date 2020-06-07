import React from "react";
import "./NewPlaylist.css";

const NewPlaylist = ({ Playlist }) => {
  return (
    <div className="new-playlist">
      {Playlist.map((i) => (
        <div className="playlist-item">
          <img src={i.img} alt="" />
          <h5 className="playlist-item-name">{i.name}</h5>
          <h6 className="playlist-item-artist">{i.artist}</h6>
        </div>
      ))}
    </div>
  );
};

export default NewPlaylist;
