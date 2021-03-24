import React, { useEffect, useState } from "react";

const GameEndOverlay = (props) => {


    return (
        <div id='gameEndOverlayContainer'>
            <div id='gameEndMessage'>
                Your score was {props.gameEndScore}. Play Again?
            </div>
            <button onClick={props.turnOffOverlay} id='btnPlayAgain'>Play again</button>
        </div>
    )
}

export default GameEndOverlay;