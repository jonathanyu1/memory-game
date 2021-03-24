import React, { useEffect, useState} from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';

const PokedexObj = new Pokedex()

const CardName = (props) => {

    const [name, setName] = useState('');

    useEffect(()=>{
        async function fetchName (){
            const pokemonName = await PokedexObj.getPokemonByName(props.id);
            setName(pokemonName.name);
        }

        fetchName()
        .catch (error=>{
            console.log('Error: '+error);
        });
        
    },[props]);


    return (
        <div className='cardName'>
            {name}
        </div>
    )
}

export default CardName;