import React from "react";
import "./Featured.css";
import Track from "../Track/Track";
import NowPlaying from "../NowPlaying/NowPlaying";

const Featured = ({
  musicControls,
  isPlaying,
  playbackProgress,
  playingState,
  addToMusicQueue,
  newReleases,
  newPlaylist,
  addToPlaylist,
  isInPlaylist,
  recentlyPlayed,
}) => {
  const getSizedImageURL = (url, size) => {
    return url.replace(/{[wh]}/g, size);
  };

  return (
    <div className="home-dashbaord">
      <div className="featured-wrap">
        <div className="number-one-track-wrap">
          {newReleases.map(
            (track, index) =>
              index === 0 && (
                <div className="number-one-track" key={track.id}>
                  <img
                    onClick={() => addToMusicQueue(track)}
                    className={
                      isInPlaylist(track.id)
                        ? "number-one-track-img track-in-playlist"
                        : "number-one-track-img"
                    }
                    src={getSizedImageURL(track.attributes.artwork.url, "1000")}
                    alt=""
                  />
                  <div className="number-one-track-info-wrap">
                    <div className="number-one-track-info">
                      <h2 className="number-one-track-title">
                        {track.attributes.name}
                      </h2>
                      <h4 className="number-one-track-artist">
                        {track.attributes.artistName}
                      </h4>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="featured-tracks">
          {playingState != null && (
            <NowPlaying
              playbackProgress={playbackProgress}
              playingState={playingState}
              getSizedImageURL={getSizedImageURL}
              musicControls={musicControls}
              isPlaying={isPlaying}
            />
          )}

          {newReleases.map((track, index) =>
            index !== 0 ? (
              <Track
                getSizedImageURL={getSizedImageURL}
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
    </div>
  );
};

export default Featured;
