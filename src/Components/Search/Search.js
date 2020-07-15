import React from "react";
import Track from "../Track/Track";
import "./Search.css";
import NowPlaying from "../NowPlaying/NowPlaying";

const Search = ({
  trackSearch,
  playbackProgress,
  musicControls,
  isPlaying,
  playingState,
  getSizedImageURL,
  addToMusicQueue,
  addToPlaylist,
  newPlaylist,
  searchResults,
  isInPlaylist,
}) => {
  return (
    <div className="search-wrap">
      <NowPlaying
        playbackProgress={playbackProgress}
        musicControls={musicControls}
        isPlaying={isPlaying}
        playingState={playingState}
        getSizedImageURL={getSizedImageURL}
      />
      <div className="search-results">
        {searchResults.map((track) => (
          <Track
            addToMusicQueue={addToMusicQueue}
            key={track.id}
            addToPlaylist={addToPlaylist}
            trackType={"large"}
            track={track}
            isInPlaylist={isInPlaylist}
            getSizedImageURL={getSizedImageURL}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
