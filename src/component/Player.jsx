import React, { useContext } from "react";
import { songsData } from "../songs";
import { datacontext } from "../context/UserContext";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

function Player() {
  const { playSong, pauseSong, playingSong ,index} = useContext(datacontext);

  return (
    <div className="w-full md:w-[60%] h-[70px] bg-white fixed bottom-[48px] md:bottom-0 rounded-t-[30px] px-4 flex justify-between items-center shadow-md">
      {/* Song Info */}
      <div className="flex items-center gap-4">
        <img
          src={songsData[index].image}
          alt="song"
          className="w-[60px]  max-h-[60px] md:max-h[80px] md:w-[80px] rounded-lg object-fill"
        />
        <div className="text-[15px] md:text-[20px]">
          <div className="text-black font-semibold">{songsData[index].name}</div>
          <div className="text-gray-700 text-sm">{songsData[index].singer}</div>
        </div>
      </div>
     <div className="w-[20%] h-[100%] md:flex justify-center items-center">
      {/* Play/Pause Button */}
      {!playingSong ? (
        <div
          className="w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-200 transition-all cursor-pointer"
          onClick={playSong}
        >
          <FaPlay className="w-[20px] h-[20px]" />
        </div>
      ) : (
        <div
          className="w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-200 transition-all cursor-pointer"
          onClick={pauseSong}
        >
          <FaPause className="w-[20px] h-[20px]" />
        </div>
      )}
      </div>
    </div>
  );
}

export default Player;
