import React, { useEffect, useState } from "react";
import Library from './Library';
import { Pokedex } from 'pokeapi-js-wrapper';

const P = new Pokedex()

const GameController = () => {

    // Need functions for: 
    // pick random ids for numCards=12 pokemon, put into array
    // shuffle order of pokemon list 
    // logic for when user clicks on a card, to be called by onClick (in card.js)
    // logic when user wins/loses (clicks on wrong card or gets score = numCards=12)

    const [numCards, setNumCards] = useState(12);
    const [idArray, setIdArray] = useState([]);


    // testing pokemon api
    useEffect(()=>{
        async function fetchPokemonByID(){
            let pokemon1 = await P.getPokemonByName('893');
            console.log(pokemon1);
        }
        fetchPokemonByID()
         .catch (error=>{
            console.log('Error: '+error);
        });
        
    })



    return (
        <div id='gameContainer'>
            <Library idArray={idArray}/>
        </div>
    )
}

export default GameController;