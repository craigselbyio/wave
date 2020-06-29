import React, { useState } from "react";
import Track from "../Track/Track";
import "./Search.css";
import { Spotify } from "../../util/Spotify";
import NowPlaying from '../NowPlaying/NowPlaying';

const Search = ({ addToMusicQueue, addToPlaylist, newPlaylist, trackSearch, searchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const isInPlaylist = (trackID) => {
    let trackIDs = newPlaylist.map((track) => track.id);
    return trackIDs.includes(trackID) ? true : false;
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="search-input-wrap">
        <form onSubmit={e => trackSearch(e, searchTerm)}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for greatness_"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </form>
        <button
        type="submit"
          className="track-search-btn"
          onClick={e => trackSearch(e, searchTerm)}
        >
          SEARCH
        </button>
      </div>
      <NowPlaying />
      <div className="search-results">
        {searchResults.map((track) => (
          <Track
          addToMusicQueue={addToMusicQueue}
            key={track.id}
            addToPlaylist={addToPlaylist}
            trackType={"large"}
            track={track}
            isInPlaylist={isInPlaylist}
          />
        ))}
      </div>
    </>
  );
};

export default Search;
