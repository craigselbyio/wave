import React from "react";
import "./NewPlaylist.css";
import { Spotify } from  '../../util/Spotify';

const NewPlaylist = ({ newPlaylist, removePlaylistItem }) => {

  const trackURISArray = () => {
    return newPlaylist.map(track => track.uri)
  }

  const createNewPlaylist = async (playlistname, trackURISArray) => {
    let data = await Spotify.addTracksToNewPlaylist(playlistname, trackURISArray());
    console.log(data);
  }

  return (
    <div className="new-playlist">
      <button onClick={() => createNewPlaylist("New Playlist", trackURISArray)} className="save-playlist-btn">SAVE</button>
      <input
        type="text"
        className="playlist-name-input"
        placeholder="Name me, so i know its real_"
      />
      <div className="playlist-items">
        {newPlaylist.map((track) => (
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
