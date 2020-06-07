import React from "react";
import "./NewPlaylist.css";

const NewPlaylist = ({ Playlist, removePlaylistItem }) => {
  return (
    <div className="new-playlist">
      <input
        className="playlist-name-input"
        placeholder="Name me, so i know its real_"
      />
      <button id="save-playlist">SAVE</button>
      <div className="playlist-items">
        {Playlist.map((track) => (
          <div className="playlist-item">
            <div className="playlist-item-remove" onClick={() => removePlaylistItem(track)}></div>
            <img src={track.img} alt="" />
            <h5 className="playlist-item-name">{track.name}</h5>
            <h6 className="playlist-item-artist">{track.artist}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewPlaylist;
