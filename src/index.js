import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.MusicKit.configure({
  developerToken:
    "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjI2UkhQQ0s0M0MifQ.eyJpYXQiOjE1OTMyMDEyNzQsImV4cCI6MTYwODc1MzI3NCwiaXNzIjoiTVA5NVI4VVZUNyJ9.Q1NgSmaiaGprYi1wEN24hL31L-xcCAUmKxKvLaYi3EcYzgfH6CyezJH0LHIzQtyDwxfta4E9Zg5f8QYTLgaxZg",
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
