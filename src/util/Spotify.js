import { clientID } from "./clientID";
const redirectURI = "http://localhost:3000";
let accessToken;

export const Spotify = {
  hasAccessTokenInURI() {
    const accessTokenMatch = window.location.href.match("access_token=([^&]*)");

    const expiresIn = window.location.href.match("expires_in=([^&]*)");

    if (accessTokenMatch && expiresIn) {
      return true;
    } else {
      return false;
    }
  },

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      const accessTokenMatch = window.location.href.match(
        "access_token=([^&]*)"
      );

      const expiresIn = window.location.href.match("expires_in=([^&]*)");

      if (accessTokenMatch && expiresIn) {
        accessToken = accessTokenMatch[1];
        setTimeout(() => (window.location = redirectURI), +expiresIn[1] * 1000);
        return accessToken;
      }

      const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user-read-private%20user-read-email%20playlist-modify-public&response_type=token`;

      window.location = authorizeURL;
    }
  },

  getNewAccessTokenAfterExpired() {
    const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user-read-private%20user-read-email%20playlist-modify-public&response_type=token`;
    window.location = authorizeURL;
  },

  async getNew() {
    this.getAccessToken();

    let response = await fetch(
      "https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp/tracks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    /*
    //Test Error Response
    let data = {
        error: {status: 401,
        message: "The access token expired"}
    };
    return data;
    */

    let data = await response.json();

    //Check if repsonse is Token invalid or Expired, attempt to get a new one
    if (data.error && data.error.status === 401) {
      console.log("401 logging");
      this.getNewAccessTokenAfterExpired();
      return data;
    } else {
      return data.items.map((item) => ({
        artist: item.track.album.artists[0].name,
        name: item.track.name,
        img: item.track.album.images[0].url,
        id: item.track.id,
        uri: item.track.uri,
      }));
    }
  },

  async trackSearch(term) {
    this.getAccessToken();

    let response = await fetch(
      `https://api.spotify.com/v1/search?q=${term}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let data = await response.json();
    //Check if repsonse is Token invalid or Expired, attempt to get a new one
    if (data.error && data.error.status === 401) {
      console.log("401 logging");
      this.getNewAccessTokenAfterExpired();
      return data;
    } else {
      console.log(data);
      return data.tracks.items.map((track) => ({
        artist: track.artists[0].name,
        name: track.name,
        img: track.album.images[0].url,
        id: track.id,
        uri: track.uri,
      }));
    }
  },

  async getCurrentUserID() {
    this.getAccessToken();

    let response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let data = await response.json();

    return data.id;
  },

  async createNewPlaylist(playlistName) {
    let userID = await this.getCurrentUserID();

    let body = JSON.stringify({
      name: playlistName,
    });

    let response = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      }
    );

    let data = await response.json();

    let playlistID = await data.id;

    return playlistID;
  },

  async addTracksToNewPlaylist(playlistName, trackURISArray) {
    let playlistID = await this.createNewPlaylist(playlistName);

    let body = JSON.stringify({
      uris: trackURISArray,
    });

    let response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      }
    );

    return response.json();
  },

  async getUsersPlaylists() {
    try {
      this.getAccessToken();

      let response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      let data = await response.json();

      return data.items.map((playlist) => ({
        name: playlist.name,
        id: playlist.id,
        img: playlist.images[0] && playlist.images[0].url,
        spotifyLink: playlist.external_urls.spotify,
      }));
    } catch (error) {
      return error;
    }
  },
  
};
