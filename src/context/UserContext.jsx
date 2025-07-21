import React,{createContext,useRef,useState,useEffect} from "react";
import { songsData } from "../songs";


export const datacontext = createContext(); 




function UserContext({children}){
 let audioRef = useRef(new Audio());
 let [index, setIndex] = useState(0);

 useEffect(()=>{
    audioRef.current.src = songsData[index].song;
    audioRef.current.load();
     if(playingSong){
       audioRef.current.play();
    }
 },[index])

 let [playingSong ,setPlayingSong] = useState(false);

  

  function playSong(){
    setPlayingSong(true);
    audioRef.current.play()
   
  }

    function pauseSong(){
    setPlayingSong(false);
    audioRef.current.pause()
  }
     
  
  function nextSong(){
      setIndex(prev=>(prev+1)%songsData.length)
  }

    function prevSong() {
  setIndex(prev => (prev - 1 + songsData.length) % songsData.length);
}


  let value = {
    audioRef,playSong,pauseSong,playingSong,setPlayingSong,nextSong,prevSong,index, setIndex
  };

  return(
    <div>
        <datacontext.Provider value={value}>
   {children}
  </datacontext.Provider>
    </div>
  )
}
export default UserContext