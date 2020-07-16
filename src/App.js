import React, { useState, useEffect } from "react";
import logo from "./img/wave-logo-v2.svg";
import "./App.css";
import Featured from "./Components/Featured/Featured";
import NewPlaylist from "./Components/NewPlaylist/NewPlaylist";
import Search from "./Components/Search/Search";
import Playlists from "./Components/Playlists/Playlists";
import Guess from "./Components/Guess/Guess";

function App() {
  const [newReleases, setNewReleases] = useState([]);

  const [playingState, setPlayingState] = useState(null);

  const [playbackProgress, setPlaybackProgress] = useState(0);

  const [newPlaylist, setNewPlaylist] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [homeView, setHomeView] = useState("new");

  const [isPlaying, setIsPlaying] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  let music = window.MusicKit.getInstance();

  useEffect(() => {
    music.api.charts(["albums", "songs"], { limit: 11 }).then((response) => {
      setNewReleases([...response.songs[0].data]);
      //console.log(response.songs[0].data.map((track) => console.log(track)));
    });

    music.addEventListener("playbackStateDidChange", (e) => {
      // Add playback event state code to isPlaying state
      console.log(music.player.isPlaying);
      setIsPlaying(music.player.isPlaying);
    });

    music.addEventListener("playbackProgressDidChange", (e) => {
      // Update PlaybackProgress state with track progress int
      console.log(e.progress);
      setPlaybackProgress(e.progress);
    });

    return () => {
      music.addEventListener("playbackProgressDidChange", (e) => {
        // Update PlaybackProgress state with track progress int
        console.log(e.progress);
        setPlaybackProgress(e.progress);
      });
    };
  }, [music, music.player.isPlaying]);

  const trackSearch = async (e, searchTerm) => {
    e.preventDefault();
    setHomeView("search");
    try {
      let results = await music.api.search(searchTerm, {
        limit: 24,
        types: "songs",
      });
      console.log(results.songs.data);
      setSearchResults([...results.songs.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // Replace placeholders in API image url with desired size
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

    //music.api.addToLibrary({songs: [track.id]}).then(r => console.log(r));
  };

  const isInPlaylist = (trackID) => {
    let trackIDs = newPlaylist.map((track) => track.id);
    return trackIDs.includes(trackID);
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

  const musicControls = {
    playMusic() {
      music.play();
    },

    pauseMusic() {
      music.pause();
    },
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="header-nav">
          <button
            className={`home-view-btn ${
              homeView === "new" && "home-view-btn-active"
            }`}
            onClick={() => setHomeView("new")}
          >
            Hot Tracks
          </button>
          <button
            className={`home-view-btn ${
              homeView === "playlists" && "home-view-btn-active"
            }`}
            onClick={() => setHomeView("playlists")}
          >
            Playlists
          </button>
          <button
            className={`home-view-btn ${
              homeView === "songGame" && "home-view-btn-active"
            }`}
            onClick={() => setHomeView("songGame")}
          >
            What's That Song
          </button>
          <div className="search-input-wrap">
            <form onSubmit={(e) => trackSearch(e, searchTerm)}>
              <input
                type="text"
                className="search-input"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </form>
            <button
              type="submit"
              className="track-search-btn"
              onClick={(e) => trackSearch(e, searchTerm)}
            ></button>
          </div>
        </div>
      </header>

      {homeView === "playlists" && (
        <Playlists
          music={music}
          userToken={music.storekit.userToken}
          getSizedImageURL={getSizedImageURL}
          newPlaylist={newPlaylist}
          setNewPlaylist={setNewPlaylist}
          removePlaylistItem={handlePlaylistRemove}
          setHomeView={setHomeView}
        />
      )}

      {homeView === "songGame" && (
        <Guess />
      )}

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
          playbackProgress={playbackProgress}
          trackSearch={trackSearch}
          searchResults={searchResults}
          musicControls={musicControls}
          isPlaying={isPlaying}
          playingState={playingState}
          getSizedImageURL={getSizedImageURL}
          addToMusicQueue={addToMusicQueue}
          addToPlaylist={handlePlaylistAdd}
          newPlaylist={newPlaylist}
          isInPlaylist={isInPlaylist}
          music={music}
        />
      )}

      {homeView === "new" && newReleases.length > 0 && (
        <Featured
          playbackProgress={playbackProgress}
          musicControls={musicControls}
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
    </div>
  );
}

export default App;
