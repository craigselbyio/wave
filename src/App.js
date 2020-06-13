import React, { useState, useEffect } from "react";
import logo from "./img/wave-logo-v2.svg";
import "./App.css";
import Featured from "./Components/Featured/Featured";
import { Spotify } from "./util/Spotify";
import NewPlaylist from "./Components/NewPlaylist/NewPlaylist";
import Search from "./Components/Search/Search";
import Playlists from "./Components/Playlists/Playlists";

function App() {
  const [newReleases, setNewReleases] = useState([]);

  const [newPlaylist, setNewPlaylist] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [homeView, setHomeView] = useState("new");

  const [spotifyStatus, setSpotifyStatus] = useState({
    status: "",
    errorMessage: "",
  });

  useEffect(() => {
    const getNewReleases = async () => {
      if (Spotify.hasAccessTokenInURI()) {
        try {
          let response = await Spotify.getNew();
          returnIfSpotifyTokenExpired(response);
          setNewReleases(response);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getNewReleases();
  }, []);

  const returnIfSpotifyTokenExpired = (response) => {
    if (response.error && response.error.status === 401) {
      console.log("error recevied!");
      setSpotifyStatus({ status: "expired", errorMessage: "Connecting..." });
      return;
    } else {
      setSpotifyStatus({ status: "current", errorMessage: "" });
    }
  };

  const getNewReleases = async () => {
    try {
      let response = await Spotify.getNew();
      returnIfSpotifyTokenExpired(response);
      setNewReleases(response);
    } catch (error) {
      console.log(error);
    }
  };

  const isInPlaylist = (trackID) => {
    let trackIDs = newPlaylist.map((track) => track.id);
    return trackIDs.includes(trackID);
  };

  const trackSearch = async (searchTerm) => {
    try {
      let response = await Spotify.trackSearch(searchTerm);
      returnIfSpotifyTokenExpired(response);
      setSearchResults([...response]);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaylistAdd = (track) => {
    if (!isInPlaylist(track.id)) {
      let newTrack = { ...track, inPlaylist: true };
      setNewPlaylist([...newPlaylist, newTrack]);

      let matchingTrack =
        newReleases.find(
          (newReleaseTrack) => newReleaseTrack.id === track.id
        ) ||
        searchResults.find(
          (newReleaseTrack) => newReleaseTrack.id === track.id
        );
      matchingTrack.inPlaylist = true;
    }
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

      {spotifyStatus.status === "current" && (
        <>
          <button
            className={`home-view-btn ${
              homeView === "new" && "home-view-btn-active"
            }`}
            onClick={() => setHomeView("new")}
          >
            Most Popular
          </button>
          <button
            className={`home-view-btn ${
              homeView === "search" && "home-view-btn-active"
            }`}
            onClick={() => setHomeView("search")}
          >
            Search Tracks
          </button>
          <button
            className={`home-view-btn ${
              homeView === "playlists" && "home-view-btn-active"
            }`}
            onClick={() => setHomeView("playlists")}
          >
            Playlists
          </button>
        </>
      )}

      {spotifyStatus.status !== "current" && (
        <div className="connect-to-spotify" onClick={getNewReleases}>
          <h3 className="connect-to-spotify-text">
            {spotifyStatus.errorMessage
              ? spotifyStatus.errorMessage
              : "Connect to Spotify"}
          </h3>
        </div>
      )}

      {newPlaylist.length > 0 ? (
        <NewPlaylist
          newPlaylist={newPlaylist}
          setNewPlaylist={setNewPlaylist}
          removePlaylistItem={handlePlaylistRemove}
          setHomeView={setHomeView}
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

      {homeView === "new" && newReleases.length > 0 && (
        <Featured
          addToPlaylist={handlePlaylistAdd}
          newReleases={newReleases}
          newPlaylist={newPlaylist}
          isInPlaylist={isInPlaylist}
        />
      )}

      {homeView === "playlists" && <Playlists />}
    </div>
  );
}

export default App;
