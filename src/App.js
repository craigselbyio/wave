import React from "react";
import logo from "./wave-logo.png";
import "./App.css";
import Featured from "./Components/Featured/Featured";
import { Spotify } from "./util/Spotify";

function App() {
  function searchGetNew() {
    Spotify.getNew();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <button onClick={searchGetNew}>Search</button>
      <Featured />
    </div>
  );
}

export default App;
