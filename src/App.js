import React, { useState, useEffect } from "react";
import logo from "./wave-logo.png";
import "./App.css";
import Featured from "./Components/Featured/Featured";
import { Spotify } from "./util/Spotify";
import NewPlaylist from './Components/NewPlaylist/NewPlaylist';
import motorsport from "./img/motorsport-migos-nickiminaj-cardib.png";

function App() {

const [newReleases, setNewReleases ] = useState([]);

async function searchGetNew() {
    let nr = await Spotify.getNew();
    setNewReleases(nr);
    console.log(newReleases)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <button onClick={searchGetNew}>Search</button>

      <NewPlaylist Playlist={[{'name': 'Motorsport', 'img': motorsport, 'artist': 'Migos, Nicki Minaj, Cardi B'}]} />

      <Featured newReleases={newReleases} />
    </div>
  );
}

export default App;
