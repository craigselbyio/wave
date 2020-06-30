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

  const [isPlaying, setIsPlaying] = useState(null);

  const [spotifyStatus, setSpotifyStatus] = useState({
    status: "",
    errorMessage: "",
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

    music.api.charts(["albums", "songs"], { limit: 21 }).then((response) => {
      setNewReleases([...response.songs[0].data]);
      //console.log(response.songs[0].data.map((track) => console.log(track)));
    });

    music.addEventListener("playbackStateDidChange", (e) => {
      // Add playback event state code to now playing track
      console.log(music.player.isPlaying);
      setIsPlaying(music.player.isPlaying);
    });

  }, [music, music.player.isPlaying]);

  // Replace placeholders in API image url to with desired size
  const getSizedImageURL = (url, size) => {
    return url.replace(/{[wh]}/g, size);
  };

  const addToMusicQueue = (track) => {
    music.setQueue({ song: track.id }).then((queue) => {
      music.stop();
      music.play();
      console.log(queue);
      setPlayingState(track);
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

  const playMusic = () => {
    music.play();
  };

  const pauseMusic = () => {
    music.pause();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

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
        pauseMusic={pauseMusic}
        playMusic={playMusic}
        isPlaying={isPlaying}
          playingState={playingState}
          getSizedImageURL={getSizedImageURL}
          addToMusicQueue={addToMusicQueue}
          addToPlaylist={handlePlaylistAdd}
          newPlaylist={newPlaylist}
          trackSearch={trackSearch}
          searchResults={searchResults}
        />
      )}

      {homeView === "new" && newReleases.length > 0 && (
        <Featured
        pauseMusic={pauseMusic}
        playMusic={playMusic}
        isPlaying={isPlaying}
          playingState={playingState}
          getSizedImageURL={getSizedImageURL}
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
