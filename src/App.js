import React, { useState, useEffect } from "react";
import logo from "./img/wave-logo-v2.svg";
import "./App.css";
import Featured from "./Components/Featured/Featured";
//import { Spotify } from "./util/Spotify";
import NewPlaylist from "./Components/NewPlaylist/NewPlaylist";
import Search from "./Components/Search/Search";
import Playlists from "./Components/Playlists/Playlists";


function App() {
  const [newReleases, setNewReleases] = useState([]);

  const [playingState, setPlayingState] = useState(null);

  const [newPlaylist, setNewPlaylist] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [homeView, setHomeView] = useState("new");

  const [spotifyStatus, setSpotifyStatus] = useState({
    status: "",
    errorMessage: "",
  });

  window.MusicKit.configure({
    developerToken:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjI2UkhQQ0s0M0MifQ.eyJpYXQiOjE1OTMyMDEyNzQsImV4cCI6MTYwODc1MzI3NCwiaXNzIjoiTVA5NVI4VVZUNyJ9.Q1NgSmaiaGprYi1wEN24hL31L-xcCAUmKxKvLaYi3EcYzgfH6CyezJH0LHIzQtyDwxfta4E9Zg5f8QYTLgaxZg",
    app: {
      name: "wave App",
      build: "1",
    },
    declarativeMarkup: true,
  });


  let music = window.MusicKit.getInstance();

  useEffect(() => {
    /*const getNewReleases = async () => {
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
    getNewReleases();*/

    music.api.charts(["albums", "songs"], {limit: 21}).then((response) => {
      setNewReleases([...response.songs[0].data]);
      //console.log(response.songs[0].data.map((track) => console.log(track)));
    });
  }, [playingState]);

  music.addEventListener("playbackStateDidChange", e => {
    e.state === 2 && console.log("2 play");
    console.log(e.state);
    console.log(playingState);
  });

const updateNowPlaying = track => {
  setPlayingState(track)
}

  const addToMusicQueue = (trackID) => {
    music.setQueue({ song: trackID }).then((queue) => {
      music.stop();
      music.play();
      console.log(queue);
      //updateNowPlaying(trackID);
    });
    
  };

  const isInPlaylist = (trackID) => {
    let trackIDs = newPlaylist.map((track) => track.id);
    return trackIDs.includes(trackID);
  };

  const trackSearch = async (e, searchTerm) => {
    e.preventDefault();
    try {
      let results = await music.api.search(searchTerm, {
        limit: 20,
        types: "songs",
      });
      console.log(results.songs.data);
      setSearchResults([...results.songs.data]);
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

  const stopMusic = () => {
    music.stop();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <button id="apple-music-authorize" className="apple-music-auth">
        Authorize
      </button>
      <button id="apple-music-unauthorize" className="apple-music-logout">
        Log Out
      </button>

      <button onClick={() => music.play()}> PLAY </button>

      <button onClick={() => music.pause()}> PAUSE </button>

      <button onClick={stopMusic}> STOP </button>

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

      {newPlaylist.length && newPlaylist.length > 0 ? (
        <NewPlaylist
          newPlaylist={newPlaylist}
          setNewPlaylist={setNewPlaylist}
          removePlaylistItem={handlePlaylistRemove}
          setHomeView={setHomeView}
        />
      ) : null}

      {homeView === "search" && (
        <Search
          addToMusicQueue={addToMusicQueue}
          addToPlaylist={handlePlaylistAdd}
          newPlaylist={newPlaylist}
          trackSearch={trackSearch}
          searchResults={searchResults}
        />
      )}

      {homeView === "new" && newReleases.length > 0 && (
        <Featured
          addToMusicQueue={addToMusicQueue}
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
