import React from "react";
import CardName from './CardName';
import CardImage from './CardImage';

const Card = (props) => {




    return (
        <div className='cardContainer' id={props.id} onClick={()=>props.checkCardsChosen(props.id)}>
            <CardImage id={props.id}/>
            <CardName id={props.id}/>
        </div>
    )
}

export default Card;