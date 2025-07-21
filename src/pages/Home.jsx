import React, { useContext, useEffect, useRef, useState } from "react";

import { songsData } from "../songs";
import musicanime from "../assets/musicanim.webp";
import { datacontext } from "../context/UserContext";

// music controller
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import Card from "../component/Card";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Player from "../component/Player";

function Home() {
  const {
    audioRef,
    playingSong,
    playSong,
    pauseSong,
    nextSong,
    prevSong,
    index,
  } = useContext(datacontext);

  const [range, setRange] = useState(0);
  const progress = useRef(null);
  const [arrow, setArrow] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const duration = audioRef.current.duration || 0;
      const currentTime = audioRef.current.currentTime || 0;
      const progressPercentage = (currentTime / duration) * 100 || 0;

      setRange(progressPercentage);

      if (progress.current) {
        progress.current.style.width = `${progressPercentage}%`;
      }
    };

    const audio = audioRef.current;
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", nextSong);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", nextSong);
    };
  }, [audioRef, nextSong]);

  function handleRange(e) {
    const newRange = e.target.value;
    setRange(newRange);
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (duration * newRange) / 100;
  }

  return (
    <div className="w-full h-screen bg-black flex relative overflow-hidden">
      {/* Toggle Arrow - only on small screens */}
      <MdOutlineKeyboardArrowDown
  className={`absolute text-white top-[20px] left-[10%] text-[30px] md:hidden z-50 cursor-pointer transition-transform duration-300 ${
    arrow ? "rotate-180" : ""
  }`}
  onClick={() => setArrow((prev) => !prev)}
/>
      {/* Left Panel - visible on md+ OR small when arrow === false */}
      <div
        className={`w-full md:w-[50%] h-full flex justify-start items-center pt-[20px] md:pt-[120px] flex-col gap-[33px] transition-all duration-300 ${
          arrow ? "hidden" : "flex"
        } md:flex`}
      >
        <h1 className="text-white font-semibold text-[25px]">Play The Music</h1>

        <div className="relative w-[80%] h-[250px] sm:w-[250px] sm:h-[250px] max-w-[270px] rounded-md overflow-hidden shadow-md">
          <img
            src={songsData[index].image}
            alt="image loading..."
            className="w-full h-full object-cover"
          />

          {playingSong && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <img
                src={musicanime}
                alt="music animation"
                className="w-[30%] sm:w-[25%] md:w-[30%]"
              />
            </div>
          )}
        </div>

        <div>
          <div className="text-white text-[30px] font-bold text-center">
            {songsData[index].name}
          </div>
          <div className="text-gray-400 text-[18px] text-center">
            {songsData[index].singer}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-[90%] sm:w-[80%] md:w-1/2 px-4 py-2 mt-4 relative h-[6px]">
          <div className="absolute top-1/2 left-0 w-full h-[6px] -translate-y-1/2 bg-gray-500 rounded-full z-0"></div>
          <div
            ref={progress}
            className="absolute top-1/2 left-0 h-[6px] -translate-y-1/2 bg-white rounded-full z-10 transition-all duration-150"
          ></div>
          <input
            type="range"
            id="range"
            value={range}
            onChange={handleRange}
            className="absolute top-1/2 left-0 w-full h-[16px] -translate-y-1/2 z-20 cursor-pointer bg-transparent appearance-none"
          />
        </div>

        {/* Music Controls */}
        <div className="text-white flex justify-center items-center gap-5">
          <CgPlayTrackPrev
            className="w-[30px] h-[30px] hover:text-gray-600 transition-all cursor-pointer"
            onClick={prevSong}
          />

          {!playingSong ? (
            <div
              className="w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer"
              onClick={playSong}
            >
              <FaPlay className="w-[20px] h-[20px]" />
            </div>
          ) : (
            <div
              className="w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer"
              onClick={pauseSong}
            >
              <FaPause className="w-[20px] h-[20px]" />
            </div>
          )}

          <CgPlayTrackNext
            className="w-[30px] h-[30px] hover:text-gray-600 transition-all cursor-pointer"
            onClick={nextSong}
          />
        </div>
      </div>

      {/* Right Panel (Song List) - always on md+, toggle on small */}
      <div
        className={`w-full md:w-[50%]  pt-[60px] overflow-auto sm-pb-[70px] transition-all duration-300 ${
          arrow ? "flex" : "hidden"
        } md:flex flex-col items-center gap-4 relative `}
      >
             <div className="md:hidden flex justify-center relative w-full px-4">

          <Player />
        </div>

        {songsData.map((song) => (
          <Card
            key={song.id}
            name={song.name}
            image={song.image}
            singer={song.singer}
            songIndex={song.id - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
