import React from 'react';
import './Tile.css'

export function Tile(props) {


    return(
        <div className='Tile' style={{backgroundColor: props.color}}>
            <p>{props.char}</p>
        </div>
    )
};