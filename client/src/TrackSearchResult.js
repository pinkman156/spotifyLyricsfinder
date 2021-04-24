import React from "react";
import "./tracks.css";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div className="container2" onClick={handlePlay}>
      <div className="tracks">
        <img src={track.albumUrl} style={{ height: "120px", width: "120px" }} />
        <div>
          <h3>{track.title}</h3>
        </div>
        <div>
          <h4> Artist:{track.artist}</h4>
        </div>
      </div>
    </div>
  );
}
