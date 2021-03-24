import React, { useEffect, useState, useRef } from "react";
import Scoreboard from './Scoreboard'
import Library from './Library';
import GameEndOverlay from './GameEndOverlay';
import { Pokedex } from 'pokeapi-js-wrapper';

const PokedexObj = new Pokedex()

const GameController = () => {

    // Need functions for: 
    // pick random ids (1 to 893 currently, for gen1-8) for numCards=12 pokemon, put into array
    // shuffle order of pokemon list 
    // logic for when user clicks on a card, to be called by onClick (in card.js)
    // logic when user wins/loses (clicks on wrong card or gets score = numCards=12)

    const [numCards, setNumCards] = useState(2);
    const [idArray, setIdArray] = useState([]);
    // const [image, setImage] = useState();
    const [cardsChosen, setCardsChosen] = useState([]);
    const [currScore, setCurrScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameEndScore, setGameEndScore] = useState('');


    const shuffleCards = () => {
        // https://stackoverflow.com/a/12646864 Durstenfeld shuffle
        let tempArray = [...idArray];
        console.log(tempArray);
        for (let i = tempArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
        }
        setIdArray(tempArray);
        console.log(tempArray);
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
        // if no: add to array, shuffle, add score
        // if yes: reset array, shuffle , reset score
        shuffleCards();

        // if clicked new card
        if (cardsChosen.indexOf(cardId)===-1){
            setCardsChosen([...cardsChosen,cardId]);
            incrementCurrScore();
            
        } else {
            // clicked a previously clicked card, lose
            // reset score
            // display game over overlay with new game button
            // new cards
            console.log('already clicked');
            console.log(cardsChosen);
            newGame();
            // updateHighScore();
            // resetCurrScore();

        }
    }

    const generateIdArray = (numCards) => {
        // generate array of numCards=12 pokemon's IDs, from 1-893 (gen 1-8)
        console.log(numCards);
        const newArr = [];
        while(newArr.length<numCards){
            const id = Math.floor(Math.random() * 893) + 1;
            console.log(id);
            if (newArr.indexOf(id)===-1){
                newArr.push(id);
            }
        }
        setIdArray(newArr);
        console.log(newArr);
        console.log(idArray);
    }

    // testing pokemon api, calls after initial render, and when numCards changes
    useEffect(()=>{
        // async function fetchPokemonByID(){
        //     let pokemon1 = await PokedexObj.getPokemonByName('893');
        //     console.log(pokemon1);
        //     console.log(pokemon1.sprites.front_default);
        //     setImage(pokemon1.sprites.front_default);
        // }
        // fetchPokemonByID()
        //  .catch (error=>{
        //     console.log('Error: '+error);
        // });

        // newIdArray(numCards);
        generateIdArray(numCards);
        
    },[numCards]);

    useEffect(()=>{
        // test if idArray changed, delete after
        console.log('new useEffect');
        console.log(idArray);
    },[idArray])

    useEffect(()=>{
        console.log(cardsChosen);
    },[cardsChosen]);


    return (
        <div id='gameContainer'>
            {/* <button onClick={shuffleCards}>Shuffle</button> */}
            {gameEndScore ? <GameEndOverlay gameEndScore={gameEndScore} turnOffOverlay={turnOffOverlay} /> : null}
            <Scoreboard currScore={currScore} highScore={highScore}/>
            <Library idArray={idArray} checkCardsChosen={checkCardsChosen}/>
        </div>
    )
}

export default GameController;