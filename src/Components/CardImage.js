import React, { useEffect, useState} from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';

const PokedexObj = new Pokedex()

const CardImage = (props) => {

    const [image, setImage] = useState();

    useEffect(()=>{
        async function fetchImage (){
            const pokemonImage = await PokedexObj.getPokemonByName(props.id);
            setImage(pokemonImage.sprites.front_default);
        }

        fetchImage()
        .catch (error=>{
            console.log('Error: '+error);
        });
        
    },[props]);
    

    return (
        <div className='cardImage'>
            <img src={image} alt={`pokemon ${props.id}`}></img>
        </div>
    )
}

export default CardImage;