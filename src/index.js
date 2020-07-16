import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { appleToken } from './util/appleToken';

window.MusicKit.configure({
  developerToken: appleToken,
  app: {
    name: "wave App",
    build: "1",
  },
  declarativeMarkup: true,
});


//let music = window.MusicKit.getInstance();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
