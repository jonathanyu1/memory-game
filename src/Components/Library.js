import React, { useEffect, useState } from "react";
import Card from './Card';

const Library = (props) => {

    return (
        <div id='libraryContainer'>
            {props.idArray.map((id)=>{
                return <Card key={id} id={id} checkCardsChosen={props.checkCardsChosen}/>
            })}
        </div>
    )
}

export default Library;