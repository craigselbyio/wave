import React from 'react';
import './NowPlaying.css';

const NowPlaying = () => {
    return (
        <div className="now-playing">
        <div className="now-playing-header">NOW<br/>PLAYING</div>
        <img
            data-apple-music-now-playing="artworkURL"
            width="100"
            height="100"
            alt="Track Cover"
            className="now-playing-img"
          />
          <span data-apple-music-now-playing="albumInfo" className="now-playing-info"></span>
        </div>
    )
}

export default NowPlaying;
