import { clientID } from "./clientID";
const redirectURI = "http://localhost:3000";
let accessToken;

export const Spotify = {
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
      "https://api.spotify.com/v1/browse/new-releases",
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
      console.log('401 logging')
      this.getNewAccessTokenAfterExpired();
      return data;
    } else {
      return data.albums.items.map((album) => ({
        artist: album.artists[0].name,
        name: album.name,
        img: album.images[0].url,
        id: album.id,
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
    console.log(data);
    if (data.error) {
      return data;
    } else {
      return data.tracks.items.map((track) => ({
        artist: track.artists[0].name,
        name: track.name,
        img: track.album.images[0].url,
        id: track.id,
      }));
    }
  },
};
