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

      if (accessTokenMatch) {
        accessToken = accessTokenMatch[1];
        return accessToken;
      }

      const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user-read-private%20user-read-email%20playlist-modify-public&response_type=token`;

      window.location = authorizeURL;
    }
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
    let data = await response.json();

    //console.log(data);
    return data.albums.items.map((album) => ({
      artist: album.artists[0].name,
      name: album.name,
      img: album.images[0].url,
      id: album.id,
    }));
    //return newReleases;
  },
};
