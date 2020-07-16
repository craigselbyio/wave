import React, { useState, useEffect } from "react";
import "./Playlist.css";
import noCover from "../../img/no-album-cover.svg";

const Playlists = ({ music }) => {
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    music.api.library.playlists().then(response => {
      console.log(response)
      setPlaylists(response)
    })

  }, []);

  return (
    <div className="playlists">
      {playlists ? (
        playlists.map((playlist, index) => (
          <div className="playlist" key={index}>
            <img className="playlist-img" src={noCover} alt="" />
            <h4>{playlist.attributes.name}</h4>
          </div>
        ))
      ) : (
        <h1>No Playlists.</h1>
      )}
    </div>
  );
};

export default Playlists;
