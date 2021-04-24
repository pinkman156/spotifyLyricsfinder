import React from "react";
import "./login.css";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=9ae9b11adb9c489b8488cd064b6212d7&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <div>
      <div className="NavBar">
        <div className="nav">
          <h1 className="h1">Welcome to Spotify</h1>
          <h1 className="dropdown">
            <a class="dropbtn" href="#">
              About
            </a>
            <div class="dropdown-content">
              An easy to use Spotify App used to search for songs by title or
              just by searching some of the lyrics
            </div>
          </h1>
        </div>
      </div>

      <div className="container">
        <div className="box1">
          <a href={AUTH_URL} className="btn">
            Login with Spotify
          </a>
        </div>
      </div>
      <footer>
        <h3>Made with ReactJS and SpotifyWebApi</h3>
      </footer>
    </div>
  );
}
