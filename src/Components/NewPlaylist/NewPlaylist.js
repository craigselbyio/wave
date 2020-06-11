import React, { useState } from "react";
import "./NewPlaylist.css";
import { Spotify } from "../../util/Spotify";

const NewPlaylist = ({
  newPlaylist,
  setNewPlaylist,
  removePlaylistItem,
  setHomeView,
}) => {
  const [playlistState, setPlaylistState] = useState({
    error: "",
    status: "SAVE",
    playlistName: "",
  });

  const trackURISArray = () => {
    return newPlaylist.map((track) => track.uri);
  };

  const createNewPlaylist = async () => {
    try {
      setPlaylistState({ ...playlistState, status: "Saving..." });
      await Spotify.addTracksToNewPlaylist(
        playlistState.playlistName,
        trackURISArray()
      );
      setPlaylistState({ ...playlistState, status: "Saved!" });
    } catch (error) {
      setPlaylistState({ ...playlistState, status: "Error!" });
    }
  };

  const handlePlaylistNameInput = (e) => {
    setPlaylistState({ ...playlistState, playlistName: e.target.value });
  };

  const finishPlaylistSave = () => {
    setHomeView("playlists");
    setNewPlaylist([]);
  };

  return (
    <div className="new-playlist">
      {playlistState.status === "SAVE" ? (
        <>
          <button
            onClick={() => createNewPlaylist()}
            className="save-playlist-btn"
            disabled={playlistState.status === "Saved!" && "disabled"}
          >
            {playlistState.status}
          </button>
          <input
            type="text"
            className="playlist-name-input"
            placeholder="Playlist Name_"
            onChange={handlePlaylistNameInput}
            value={playlistState.playlistName}
          />
          <div className="playlist-items">
            {newPlaylist.map((track) => (
              <div className="playlist-item" key={track.id}>
                <div
                  className="playlist-item-remove"
                  onClick={() => removePlaylistItem(track)}
                ></div>
                <img src={track.img} alt="" />
                <h5 className="playlist-item-name">
                  {track.name.length > 20
                    ? `${track.name.substring(0, 20)}...`
                    : track.name}
                </h5>
                <h6 className="playlist-item-artist">{track.artist}</h6>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div onClick={finishPlaylistSave}>
          <h1 style={{cursor: "pointer", display: "inline-block"}}>
            Playlist Saved, View all Playlists
          </h1>
        </div>
      )}
    </div>
  );
};

export default NewPlaylist;
