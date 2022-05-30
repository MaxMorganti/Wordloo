import React from 'react';
import './Row.css'
import {Tile} from '../Tile/Tile';

export function Row(props) {

    return(
        <div>
            <Tile char={props.rowChars[0]} color={props.rowColors[0]}/>
            <Tile char={props.rowChars[1]} color={props.rowColors[1]}/>
            <Tile char={props.rowChars[2]} color={props.rowColors[2]}/>
            <Tile char={props.rowChars[3]} color={props.rowColors[3]}/>
            <Tile char={props.rowChars[4]} color={props.rowColors[4]}/>
            <Tile char={props.rowChars[5]} color={props.rowColors[5]}/>
        </div>
    )
};