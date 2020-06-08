import React, { useState } from "react";
import Track from "../Track/Track";
import "./Search.css";
import { Spotify } from "../../util/Spotify";

const Search = ({ addToPlaylist, newPlaylist, trackSearch ,searchResults }) => {
  
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
      <input
        className="search-input"
        placeholder="Search for greatness_"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <button
        className="track-search-btn"
        onClick={() => trackSearch(searchTerm)}
      >
        SEARCH
      </button>
      </div>
      <div className="search-results">
        {searchResults.map((track) => (
          <Track
            addToPlaylist={addToPlaylist}
            trackType={"small"}
            track={track}
            isInPlaylist={isInPlaylist}
          />
        ))}
      </div>
    </>
  );
};

export default Search;
