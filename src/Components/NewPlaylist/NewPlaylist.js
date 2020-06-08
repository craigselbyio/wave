import React from "react";
import "./NewPlaylist.css";

const NewPlaylist = ({ Playlist, removePlaylistItem }) => {
  return (
    <div className="new-playlist">
      <button id="save-playlist">SAVE</button>
      <input
        className="playlist-name-input"
        placeholder="Name me, so i know its real_"
      />
      <div className="playlist-items">
        {Playlist.map((track) => (
          <div className="playlist-item" key={track.id}>
            <div className="playlist-item-remove" onClick={() => removePlaylistItem(track)}></div>
            <img src={track.img} alt="" />
            <h5 className="playlist-item-name">{ track.name.length > 20 ? `${track.name.substring(0,20)}...` : track.name }</h5>
            <h6 className="playlist-item-artist">{ track.artist }</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewPlaylist;
