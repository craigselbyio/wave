import React from "react";
import "./NowPlaying.css";

const NowPlaying = ({
  playingState,
  isPlaying,
  getSizedImageURL,
  playMusic,
  pauseMusic,
}) =>
  playingState !== null && (
    <div className="now-playing">
      <div className="now-playing-img">
        <div
          className={isPlaying ? "now-playing-circle playing" : "now-playing-circle"}
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
        <div className="now-playing-pause" onClick={pauseMusic}></div>
      ) : (
        <div className="now-playing-play" onClick={playMusic}></div>
      )}
    </div>
  );

export default NowPlaying;
