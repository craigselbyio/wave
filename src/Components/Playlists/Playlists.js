import React, { useState, useEffect } from 'react';
import './Playlist.css';
import { Spotify } from '../../util/Spotify';
import noCover from '../../img/no-album-cover.svg';


const Playlists = () => {

    const [playlists , setPlaylists] = useState();

    useEffect(() => {
        const getUsersPlaylists = async () => {
            let playlists = await Spotify.getUsersPlaylists();
            setPlaylists([...playlists]);
            console.log(playlists);
        }
        getUsersPlaylists();
    }, [])

    return (
        <div className="playlists">
            {playlists ? (
            playlists.map(playlist => (
                <a href={playlist.spotifyLink} target="new" key={playlists.id}>
                <div className="playlist">
                    <img className="playlist-img" src={playlist.img ? playlist.img : noCover} alt="" />
                    <h4>{playlist.name}</h4>
                </div>
                </a>
            ))
            ) : <h1>No Playlists.</h1>}
        </div>
    )

}

export default Playlists;