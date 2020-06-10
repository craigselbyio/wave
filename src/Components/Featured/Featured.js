import React from "react";
import "./featured.css";
import Track from "../Track/Track";

const Featured = ({
  newReleases,
  newPlaylist,
  addToPlaylist,
  isInPlaylist,
}) => {
  return (
    <div className="featured-wrap">
      <div className="number-one-track-wrap">
        {newReleases.map(
          (track, index) =>
            index === 0 && (
              <div className="number-one-track">
                <img
                  onClick={() => addToPlaylist(track)}
                  className={isInPlaylist(track.id) ? 'number-one-track-img track-in-playlist': 'number-one-track-img'}
                  src={track.img}
                  alt=""
                />
                <div className="number-one-track-info-wrap">
                  <div className="number-one-track-info">
                    <h2 className="number-one-track-title">{track.name}</h2>
                    <h4 className="number-one-track-artist">{track.artist}</h4>
                  </div>
                  <button
                    onClick={() => addToPlaylist(track)}
                    className={
                      isInPlaylist(track.id)
                        ? "add-or-remove-track-btn track-in-playlist"
                        : "add-or-remove-track-btn"
                    }
                    disabled={isInPlaylist(track.id) ? "disabled" : ""}
                  ></button>
                </div>
                </div>
            )
        )}
      </div>
      <div className="featured-tracks">
        <h4 className="featured-track-top-text">
          Click on Track or Search to Create a Playlist
        </h4>
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
