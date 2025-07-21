import React from "react";
import { RiHomeWifiFill } from "react-icons/ri";
import { CgSearchLoading } from "react-icons/cg";
import { TbPlaylist } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
function Nav(){
  return (
    <div className="w-full h-[50px] bg-black fixed   bottom-0 md:top-0 text-white flex  justify-around md:justify-center items-center gap-[50px] p-[10px] z-30 rounded-t-[0px] shadow">
    <Link to={"/"}>
    <RiHomeWifiFill className="w-[30px] h-[30px]" />
    </Link>

 <Link to={"/search"}>
 <CgSearchLoading  className="w-[30px] h-[30px]" />
 </Link>

 <Link to={"/playlist"}>
<TbPlaylist  className="w-[30px] h-[30px]" />
 </Link>

 <Link to={"/liked"}>
<FaHeart  className="w-[30px] h-[30px]" />
</Link>
    </div>
  )
}

export default Nav;