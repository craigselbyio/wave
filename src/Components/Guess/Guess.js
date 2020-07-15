import React from "react";
import "./Guess.css";
import albumCover from "../../img/motorsport-migos-nickiminaj-cardib.png";

const Guess = () => {
  return (
    <div className="song-guess-wrap">
      <div className="coming-soon"></div>
      <div className="song-guess-intro">
        <h3>
          Test your music knowledge! Hear 10 seconds of a song then try to
          identify the correct song.
        </h3>
      </div>
      <div className="song-info">
        <div className="song-cover">
          <img src={albumCover} alt="Album Cover" />
        </div>
        <ul className="song-options">
          <li>
            <h4>Blinding Lights</h4>
            <p>The Weekend</p>
          </li>
          <li>
            <h4>Thinkin Bout You</h4>
            <p>Frank Ocean</p>
          </li>
          <li>
            <h4>What Hurts the Most</h4>
            <p>Rascal Flatts</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Guess;
