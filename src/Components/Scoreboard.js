import React from "react";

const Scoreboard = (props) => {

    return (
        <div id='scoreboardContainer'>
            <div id='currentScore'>Current Score: {props.currScore}</div>
            <div id='highestScore'>High Score: {props.highScore}</div>
        </div>
    )
}

export default Scoreboard;