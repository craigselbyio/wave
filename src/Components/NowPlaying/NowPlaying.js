import React from "react";
import "./NowPlaying.css";

const NowPlaying = ({
  playingState,
  playbackProgress,
  isPlaying,
  getSizedImageURL,
  musicControls
}) =>
  playingState !== null && (
    <div className="now-playing">
      <div className="playback-progress-wrap">
        <div className="playback-progress" style={{width: `${playbackProgress * 100}%`}}></div>
      </div>
      <div className="now-playing-img">
        <div
          className="now-playing-circle"
          style={{ animationPlayState: !isPlaying && "paused" }}
        ></div>
        <img
          src={getSizedImageURL(playingState.attributes.artwork.url, "600")}
          alt="Track Cover"
          className="now-playing-img"
        />
      </div>
      <div className="now-playing-info">
        <div className="now-playing-name">{playingState.attributes.name}</div>
        <div className="now-playing-artist-name">
          {playingState.attributes.artistName}
        </div>
      </div>
      {isPlaying ? (
        <div className="now-playing-pause" onClick={musicControls.pauseMusic}></div>
      ) : (
        <div className="now-playing-play" onClick={musicControls.playMusic}></div>
      )}
    </div>
  );

export default NowPlaying;
