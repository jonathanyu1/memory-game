import React, { useEffect, useState } from "react";
import { Pokedex } from 'pokeapi-js-wrapper';

const PokedexObj = new Pokedex()

const Header = () => {

    const [image, setImage] = useState();

    useEffect(()=>{
        async function fetchImage (){
            const pokemonImage = await PokedexObj.getPokemonByName(25);
            setImage(pokemonImage.sprites.front_default);
        }

        fetchImage()
        .catch (error=>{
            console.log('Error: '+error);
        });
        
    },[]);

    return (
        <div id='headerContainer'>
            <div id='headerTitleContainer'>
                <img src={image} alt='pikachuLogo'></img>
                <div id='headerTitle'>Pokémon Memory Game</div>
            </div>
            <div id='gameInstructions'>Click on a Pokémon you haven't clicked yet!</div>
        </div>
    )
}

export default Header;