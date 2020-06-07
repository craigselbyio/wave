import React, { useState, useEffect } from "react";
import logo from "./wave-logo.png";
import "./App.css";
import Featured from "./Components/Featured/Featured";
import { Spotify } from "./util/Spotify";
import NewPlaylist from './Components/NewPlaylist/NewPlaylist';
import motorsport from "./img/motorsport-migos-nickiminaj-cardib.png";

function App() {

const [newReleases, setNewReleases ] = useState([]);

const [newPlaylist, setNewPlaylist ] = useState([]);

async function searchGetNew() {
    let nr = await Spotify.getNew();
    console.log(nr)
    if(nr.error) {
      console.log(nr.error)
    } else {
      setNewReleases(nr);
      console.log(newReleases)
    }
  }
  //searchGetNew()
  
  const handlePlaylistAdd = (track) => {
    let newTrack = {...track,
    "inPlaylist": true}
    setNewPlaylist([...newPlaylist, newTrack]);

    let matchingTrack = newReleases.find(newReleaseTrack => newReleaseTrack.id === track.id);
    matchingTrack.inPlaylist = true;

    console.log(matchingTrack);
  }

  const handlePlaylistRemove = (track) => {
    let updatedPlaylist = newPlaylist.filter(playlistTrack => playlistTrack.id !== track.id);
    setNewPlaylist([...updatedPlaylist])
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <button onClick={searchGetNew}>Search</button>

      <NewPlaylist Playlist={newPlaylist} removePlaylistItem={handlePlaylistRemove} />

      <input className="search-input" placeholder="Search for greatness_" />
      <Featured addToPlaylist={handlePlaylistAdd} newReleases={newReleases} newPlaylist={newPlaylist} />
    </div>
  );
}

export default App;
