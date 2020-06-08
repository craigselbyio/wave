import React, { useState, useEffect } from "react";
import logo from "./img/wave-logo.svg";
import "./App.css";
import Featured from "./Components/Featured/Featured";
import { Spotify } from "./util/Spotify";
import NewPlaylist from "./Components/NewPlaylist/NewPlaylist";
import motorsport from "./img/motorsport-migos-nickiminaj-cardib.png";
import Search from "./Components/Search/Search";

function App() {
  const [newReleases, setNewReleases] = useState([]);

  const [newPlaylist, setNewPlaylist] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [homeView, setHomeView] = useState("new");

  useEffect(() => {
    const getNewReleases = async () => {
      let response = await Spotify.getNew();

      if (response.error) {
        console.log(response.error);
      } else {
        setNewReleases(response);
      }
    };
    getNewReleases();
  }, []);

  const trackSearch = async (searchTerm) => {
    try {
      let searchResults = await Spotify.trackSearch(searchTerm);
      console.log(searchResults);
      setSearchResults([...searchResults]);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaylistAdd = (track) => {
    let newTrack = { ...track, inPlaylist: true };
    setNewPlaylist([...newPlaylist, newTrack]);

    let matchingTrack =
      newReleases.find((newReleaseTrack) => newReleaseTrack.id === track.id) ||
      searchResults.find((newReleaseTrack) => newReleaseTrack.id === track.id);
    matchingTrack.inPlaylist = true;
  };

  const handlePlaylistRemove = (track) => {
    let updatedPlaylist = newPlaylist.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    setNewPlaylist([...updatedPlaylist]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <button className={`home-view-btn ${homeView === 'new' && 'home-view-btn-active'}`} onClick={() => setHomeView("new")}>New</button>
      <button className={`home-view-btn ${homeView === 'search' && 'home-view-btn-active'}`} onClick={() => setHomeView("search")}>Search</button>

      {newPlaylist.length > 0 ? (
        <NewPlaylist
          Playlist={newPlaylist}
          removePlaylistItem={handlePlaylistRemove}
        />
      ) : null}

      {homeView === "search" && (
        <Search
          addToPlaylist={handlePlaylistAdd}
          newPlaylist={newPlaylist}
          trackSearch={trackSearch}
          searchResults={searchResults}
        />
      )}

      {homeView === "new" && (
        <Featured
          addToPlaylist={handlePlaylistAdd}
          newReleases={newReleases}
          newPlaylist={newPlaylist}
        />
      )}

    </div>
  );
}

export default App;
