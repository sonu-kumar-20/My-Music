import React from "react";
import Player from "../component/Player";
import { useSelector } from "react-redux";
import Card from "../component/Card";

function Playlist() {
  const songs = useSelector((state) => state.playlist);

  return (
    <div className="min-h-screen bg-black text-white pt-[10px] px-4 flex flex-col items-center overflow-x-hidden md:pt-[30px]">
      <Player />

      <h1 className="text-2xl font-bold my-6">My-Playlist</h1>

      {/* Centered container */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[700px] flex flex-col items-center gap-5">
          {songs.map((song) => (
            <Card
              key={song.songIndex}
              name={song.name}
              image={song.image}
              singer={song.singer}
              songIndex={song.songIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
