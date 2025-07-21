import React from "react";
import Home from './pages/Home.jsx'
import './index.css';
import { BrowserRouter, Routes ,Route} from "react-router-dom";
import Search from "./pages/Search.jsx";
import Playlist from "./pages/PlayList.jsx";
import Liked from "./pages/Liked.jsx";
import Nav from "./component/Nav.jsx";
function App() {
  return (
    <BrowserRouter>
     <Nav/>

    <Routes>
     <Route path='/' element = {<Home/>}/>
      <Route path='/search' element = {<Search/>}/>
      <Route path='/playlist' element = {<Playlist/>}/>
     <Route path='/liked' element = {<Liked/>}/>
      
    </Routes>
   
    </BrowserRouter>
  );
}

export default App;
