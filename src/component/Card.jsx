import React, { useContext } from "react";
import { MdPlaylistAdd, MdPlaylistRemove } from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { datacontext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { AddSong, removeSong } from "../redux/PlaylistSlice";
import { AddLiked, RemoveLiked } from "../redux/LikedSlice";

function Card({ name, image, singer, songIndex }) {
  const { playSong, setIndex } = useContext(datacontext);
  const dispatch = useDispatch();

  const playlist = useSelector((state) => state.playlist);
  const likedSongs = useSelector((state) => state.liked);

  const isInPlaylist = playlist.some((song) => song.songIndex === songIndex);
  const isLiked = likedSongs.some((song) => song.songIndex === songIndex);

  const songData = { name, image, singer, songIndex };

  return (
    <div
      className="w-[90%] h-[70px] md:h-[125px] bg-slate-700 rounded-lg p-[5px] md:p-[12px] flex justify-center items-center hover:bg-gray-500 transition-all cursor-pointer"
      onClick={() => {
        setIndex(songIndex);
        playSong();
      }}
    >
      {/* Left Side: Song Info */}
      <div className="flex justify-start items-center gap-[20px] w-[70%] h-[100%]">
        <img
          src={image}
          alt="image loading..."
          className="w-[60px] max-h-[60px] md:max-h-[100px] md:w-[100px] rounded-lg"
        />
        <div className="text-[13px] md:text-[16px]">
          <div className="text-white text-[1.1em] md:text-[1.4em] font-semibold">{name}</div>
          <div className="text-gray-300 text-[0.8em] font-semibold">{singer}</div>
        </div>
      </div>

      {/* Right Side: Action Icons */}
      <div
        className="flex justify-center items-center gap-[20px] w-[30%] h-[100%] text-[15px] md:text-[20px]"
        onClick={(e) => e.stopPropagation()} // Prevent triggering play
      >
        {isInPlaylist ? (
          <MdPlaylistRemove
            className="text-white text-[1.7em] cursor-pointer"
            onClick={() => dispatch(removeSong({ songIndex }))}
          />
        ) : (
          <MdPlaylistAdd
            className="text-white text-[1.7em] cursor-pointer"
            onClick={() => dispatch(AddSong(songData))}
          />
        )}

        {isLiked ? (
          <GoHeartFill
            className="text-red-500 text-[1.7em] cursor-pointer"
            onClick={() => dispatch(RemoveLiked({ songIndex }))}
          />
        ) : (
          <GoHeart
            className="text-white text-[1.5em] cursor-pointer"
            onClick={() => dispatch(AddLiked(songData))}
          />
        )}
      </div>
    </div>
  );
}

export default Card;
