import React from "react";
import "./featured.css";
import Track from "../Track/Track";
import NowPlaying from '../NowPlaying/NowPlaying';

const Featured = ({
  addToMusicQueue,
  newReleases,
  newPlaylist,
  addToPlaylist,
  isInPlaylist,
}) => {

  const getSizedImageURL = (url, size) => {
    return url.replace(/{[wh]}/g, size);
  }

  return (
    <div className="featured-wrap">
      <div className="number-one-track-wrap">
      {newReleases.map(
          (track, index) =>
            index === 0 && (
              <div className="number-one-track" key={track.id}>
                <img
                  onClick={() => addToMusicQueue(track.id)}
                  className={isInPlaylist(track.id) ? 'number-one-track-img track-in-playlist': 'number-one-track-img'}
                  src={getSizedImageURL(track.attributes.artwork.url, "1000")}
                  alt=""
                />
                <div className="number-one-track-info-wrap">
                  <div className="number-one-track-info">
                    <h2 className="number-one-track-title">{track.attributes.name}</h2>
                    <h4 className="number-one-track-artist">{track.attributes.artistName}</h4>
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
      <NowPlaying />

        {newReleases.map((track, index) =>
          index !== 0 ? (
            <Track
              addToMusicQueue={addToMusicQueue}
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
