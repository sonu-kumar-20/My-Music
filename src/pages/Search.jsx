import React, { useContext, useEffect, useState } from "react";
import Player from "../component/Player";
import { FiSearch } from "react-icons/fi";
import { songsData } from "../songs";
import Card from "../component/Card";
import { datacontext } from "../context/UserContext";

function Search() {
  const [input, setInput] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const { setSong } = useContext(datacontext);

  const sampleSongs = songsData.slice(0, 5);

  useEffect(() => {
    if (input.trim() !== "") {
      const filtered = songsData.filter(
        (song) =>
          song.name.toLowerCase().includes(input.toLowerCase()) ||
          song.singer.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs([]);
    }
  }, [input]);

  const songsToDisplay = input.trim() === "" ? sampleSongs : filteredSongs;

  return (
    <div className="min-h-screen bg-black text-white pt-[10px] px-4 flex flex-col items-center overflow-x-hidden md:pt-[30px]">
      <Player />

      <h1 className="text-2xl font-bold my-6">Search Songs</h1>

      {/* Search Bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-[700px] h-12 flex items-center gap-3 bg-gray-800 rounded-full px-4 mt-2"
      >
        <FiSearch className="text-gray-300 text-xl" />
        <input
          type="text"
          className="flex-grow bg-transparent text-sm md:text-base placeholder-gray-400 focus:outline-none"
          placeholder="Search by song or singer..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </form>

      {/* Cards Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[700px] flex flex-col items-center gap-5 mt-6">
          {songsToDisplay.length === 0 && input.trim() !== "" ? (
            <p className="text-center text-gray-400 text-sm">
              No matching songs found.
            </p>
          ) : (
            songsToDisplay.map((song) => (
              <div
                key={song.id}
                onClick={() => setSong(song.id - 1)}
                className="w-full flex justify-center"
              >
                <Card
                  name={song.name}
                  image={song.image}
                  singer={song.singer}
                  songIndex={song.id - 1}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {input.trim() === "" && (
        <p className="text-xs text-gray-400 italic mt-4 text-center">
          Type to search more...
        </p>
      )}
    </div>
  );
}

export default Search;
 