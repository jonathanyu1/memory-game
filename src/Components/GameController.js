import React, { useEffect, useState } from "react";
import Scoreboard from './Scoreboard'
import Library from './Library';
import GameEndOverlay from './GameEndOverlay';

const GameController = () => {

    const [numCards, setNumCards] = useState(10);
    const [idArray, setIdArray] = useState([]);
    const [cardsChosen, setCardsChosen] = useState([]);
    const [currScore, setCurrScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameEndScore, setGameEndScore] = useState('');
    const [sliderValue, setSliderValue] = useState(10);


    const shuffleCards = () => {
        // https://stackoverflow.com/a/12646864 Durstenfeld shuffle
        let tempArray = [...idArray];
        for (let i = tempArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
        }
        setIdArray(tempArray);
    }

    const resetCardsChosen = () =>{
        setCardsChosen([]);
    }

    const resetCurrScore = () => {
        setCurrScore(0);
    }

    const incrementCurrScore = () =>{
        setCurrScore(currScore+1);
    }

    const updateHighScore = () => {
        if (currScore>highScore){
            setHighScore(currScore);
        }
    }

    const turnOffOverlay = () => {
        setGameEndScore('');
    }

    const updateGameEndScore = () => {
        setGameEndScore(currScore);
    }

    const newGame = () =>{
        updateGameEndScore();
        updateHighScore();
        resetCurrScore();
        resetCardsChosen();
        generateIdArray(numCards);
    }

    useEffect(()=>{
        // checks if game win
        if (currScore===numCards){
            newGame();

        }
    },[currScore])

    const checkCardsChosen = (cardId) => {
        // check if card is in cardsChosen array

        // if clicked new card
        if (cardsChosen.indexOf(cardId)===-1){
            setCardsChosen([...cardsChosen,cardId]);
            incrementCurrScore();
            shuffleCards();  
        } else {
            // clicked a previously clicked card, lose
            // reset score
            // display game over overlay with new game button
            // new cards
            newGame();

        }
    }

    const generateIdArray = (numCards) => {
        // generate array of numCards=10 pokemon's IDs, from 1-893 (gen 1-8)
        const newArr = [];
        while(newArr.length<numCards){
            const id = Math.floor(Math.random() * 893) + 1;
            if (newArr.indexOf(id)===-1){
                newArr.push(id);
            }
        }
        setIdArray(newArr);
    }

    // testing pokemon api, calls after initial render, and when numCards changes
    useEffect(()=>{
        newGame();
        turnOffOverlay();
    },[numCards]);

    const onChange = (e) => {
        setSliderValue(e.target.value);
    }

    const handleSliderChange = (e) =>{
        setSliderValue(e.target.value);
        setNumCards(sliderValue);
    }

    return (
        <div id='gameContainer'>
            {/* {gameEndScore ? null : <Scoreboard currScore={currScore} highScore={highScore}/>} */}
            <Scoreboard currScore={currScore} highScore={highScore}/>
            {gameEndScore ? null : <Library idArray={idArray} checkCardsChosen={checkCardsChosen}/>}
            {gameEndScore ? <GameEndOverlay gameEndScore={gameEndScore} turnOffOverlay={turnOffOverlay} /> : null}
            {gameEndScore ? null : (<div id='sliderContainer'>
                                        <input 
                                            type='range'
                                            id='numCardsSlider'
                                            min='2'
                                            max='15'
                                            value={sliderValue}
                                            onChange={onChange}
                                            onMouseUp={handleSliderChange}
                                        />
                                        <div id='sliderValueText'>{sliderValue}</div>
                                    </div>)}
        </div>
    )
}

export default GameController;