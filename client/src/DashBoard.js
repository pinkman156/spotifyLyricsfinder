import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import "./DashBoard.css";

const spotifyApi = new SpotifyWebApi({
  clientId: "9ae9b11adb9c489b8488cd064b6212d7",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentResults, setRecentResults] = useState([]);

  const [playingTrack, setPlayingTrack] = useState([]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  function getMyRecents() {
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 3 }).then((result) => {
      setRecentResults(result.body.items);
      console.log(recentResults);

      return;
    });
    document.getElementById("mess").style.display = "none";
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="container">
      <div className="container1">
        <div className="recentres">
          <button className="btn1" onClick={getMyRecents}>
            Display my Recent Tracks
          </button>
          <div id="recent">
            <h3 className="rec">Your recently played tracks:</h3>
            <h3 id="mess">Press the button to display</h3>
            <ul>
              {recentResults.map((item) => (
                <li>
                  <h3 className="name"> {item.track.name}</h3>
                  <h5 className="art">Artist: {item.track.artists[0].name}</h5>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="welc">
          <h3>
            Welcome! <br></br>
            <br></br>
            Search for a song and press the play button at the bottom to play
            the track!
          </h3>
        </div>
        <div className="searcharea">
          <h1 className="enter">
            Enter song name or lyrics of the song you want to search
          </h1>
          <div className="searchBar">
            <form className="search">
              <input
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </form>
          </div>
        </div>
      </div>
      <div className="results">
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>

      <div className="Player">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
}
