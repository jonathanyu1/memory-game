import React from "react";

const Scoreboard = (props) => {

    // const [currScore, setCurrScore] = useState(0);
    // const [highScore, setHighScore] = useState(0);

    // const incrementCurrScore = () =>{
    //     setCurrScore(currScore+1);
    //     if (currScore>highScore){
    //         updateHighScore();
    //     }
    // }

    // const updateHighScore = () =>{
    //     setHighScore(highScore+1);
    // }

    return (
        <div id='scoreboardContainer'>
            <div id='currentScore'>Current Score: {props.currScore}</div>
            <div id='highestScore'>High Score: {props.highScore}</div>
        </div>
    )
}

export default Scoreboard;