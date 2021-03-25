import React, { useEffect, useState } from "react";
import './App.css'
import Header from './Components/Header';
import GameController from './Components/GameController';


const App = () =>{
  return (
    <div id='wholeContainer'>
      <Header/>
      <GameController/>
    </div>
  )
}

export default App;
