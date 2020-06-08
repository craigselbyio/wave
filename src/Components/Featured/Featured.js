import React from "react";
import "./featured.css";
import motorsport from "../../img/motorsport-migos-nickiminaj-cardib.png";
import Track from "../Track/Track";

const Featured = ({ newReleases, newPlaylist, addToPlaylist }) => {
  
  const isInPlaylist = (trackID) => {
    let trackIDs = newPlaylist.map((track) => track.id);
    return trackIDs.includes(trackID) ? true : false;
  };

  return (
    <div className="featured-wrap">
      <div className="number-one-track">
        {newReleases.map((track, index) =>
          index === 0 ? (
            <>
              <img className="number-one-track-img" src={track.img} alt="" />
              <h2 className="number-one-track-title">{track.name}</h2>
              <h4 className="number-one-track-artist">{track.artist}</h4>
            </>
          ) : (
            ""
          )
        )}
      </div>
      <div className="featured-tracks">
        {newReleases.map((track, index) =>
          index !== 0 ? (
            <Track
              addToPlaylist={addToPlaylist}
              trackType={"small"}
              track={track}
              isInPlaylist={isInPlaylist}
              key={track.id}
            />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default Featured;
