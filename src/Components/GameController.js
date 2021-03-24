import React, { useEffect, useState } from "react";
import Library from './Library';
import { Pokedex } from 'pokeapi-js-wrapper';

const PokedexObj = new Pokedex()

const GameController = () => {

    // Need functions for: 
    // pick random ids (1 to 893 currently, for gen1-8) for numCards=12 pokemon, put into array
    // shuffle order of pokemon list 
    // logic for when user clicks on a card, to be called by onClick (in card.js)
    // logic when user wins/loses (clicks on wrong card or gets score = numCards=12)

    const [numCards, setNumCards] = useState(12);
    const [idArray, setIdArray] = useState([]);
    // const [image, setImage] = useState();
    const [cardsChosen, setCardsChosen] = useState([]);


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

    const checkCardsChosen = (card) => {
        // check if card is in cardsChosen array
        // if no: add to array, shuffle, add score
        // if yes: reset array, shuffle , reset score
        shuffleCards();
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


    return (
        <div id='gameContainer'>
            <button onClick={shuffleCards}>Shuffle</button>
            <Library idArray={idArray} checkCardsChosen={checkCardsChosen}/>
        </div>
    )
}

export default GameController;