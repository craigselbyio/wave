import React from 'react';
import logo from './wave-logo.png';
import './App.css';
import Featured from './Components/Featured/Featured';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Featured />
    </div>
  );
}

export default App;
