import React, { useState, useEffect } from "react";
import logo from "./wave-logo.png";
import "./App.css";
import Featured from "./Components/Featured/Featured";
import { Spotify } from "./util/Spotify";
import NewPlaylist from './Components/NewPlaylist/NewPlaylist';
import motorsport from "./img/motorsport-migos-nickiminaj-cardib.png";
import Search from "./Components/Search/Search";

function App() {

const [newReleases, setNewReleases ] = useState([]);

const [newPlaylist, setNewPlaylist ] = useState([]);

const [searchResults, setSearchResults] = useState([]);

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
  
  const trackSearch = async (searchTerm) => {
    try {
      let searchResults = await Spotify.trackSearch(searchTerm);
      console.log(searchResults);
      setSearchResults([...searchResults]);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handlePlaylistAdd = (track) => {
    let newTrack = {...track,
    "inPlaylist": true}
    setNewPlaylist([...newPlaylist, newTrack]);

    let matchingTrack = newReleases.find(newReleaseTrack => newReleaseTrack.id === track.id) || searchResults.find(newReleaseTrack => newReleaseTrack.id === track.id) ;
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

      {newPlaylist.length > 0 ? <NewPlaylist Playlist={newPlaylist} removePlaylistItem={handlePlaylistRemove} /> : null}

      <Search addToPlaylist={handlePlaylistAdd} newPlaylist={newPlaylist} trackSearch={trackSearch} searchResults={searchResults} />

      {searchResults.length > 0 ? null : <Featured addToPlaylist={handlePlaylistAdd} newReleases={newReleases} newPlaylist={newPlaylist} /> }
    </div>
  );
}

export default App;
