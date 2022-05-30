import './App.css';
import '../../reset.css'
import {Row} from '../Row/Row';
import { possibleWords } from '../../possibleWords';
import React, {useState,useEffect} from 'react';

const correctWord = ['S','Q','U','I','S','H'];
let colIndex = 0;
let rowIndex = 0;

function App() {
 
  //initialize board state
  const [char,setChar] = useState([
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','','']
  ]);
  const [color,setColor] = useState([
    ['white','white','white','white','white','white'],
    ['white','white','white','white','white','white'],
    ['white','white','white','white','white','white'],
    ['white','white','white','white','white','white'],
    ['white','white','white','white','white','white'],
    ['white','white','white','white','white','white']
]);

  useEffect(() => {
    let randomWordIndex = Math.floor((Math.random()*possibleWords.length) + 1);
    console.log(possibleWords[randomWordIndex]);
  },[]);

  const handleKeyDown = (event) => {

    //handle Enter: need to reset colIndex, increment RowIndex, run checks + animations
    if(event.key === 'Enter') {
      if(colIndex !== 6) return; //eventually play a little animation here that input isn't valid
      handleSubmit();
    }


    //handle backspace
    if(event.key === 'Backspace') { 
        if(colIndex === 0) return;
        colIndex--;
        setChar( prev => {
          let newChars = prev.slice();
          newChars[rowIndex][colIndex] = '';
          return newChars;
        });
        return;
    } 

    //keep input from going out of bounds
    if(colIndex === 6) return;
    //validate only alphabetical chars
    if(event.keyCode > 90 || event.keyCode < 65) return;
      colIndex++;
      setChar( prev => {
        let newChars = prev.slice();
        newChars[rowIndex][colIndex - 1] = event.key.toUpperCase();
        return newChars;
      }); 
  }

  const handleSubmit = async () => {
    await checkInput(char[rowIndex],correctWord);
    rowIndex++;
    colIndex = 0;
  }

  const checkInput = (inputArray,correctArray) => {
    
    //mark the greens first
    for(let i = 0; i <= 5; i++) {
      if(inputArray[i] === correctArray[i]) {
        setColor( prev => {
          let newColors = prev.slice();
          newColors[rowIndex][i] = 'lightgreen';
          return newColors;
        });
      }      
    }

    //then mark yellow
    for(let i = 0; i <=5; i++) {
      if(correctArray.includes(inputArray[i]) && inputArray[i] !== correctArray[i]) {
        setColor( prev => {
          let newColors = prev.slice();
          newColors[rowIndex][i] = 'yellow';
          return newColors;
        });
      }
    }
  }

  return (
    <div className="container">
      <div className="gameBoard" onKeyDown={handleKeyDown} tabIndex="0" style={{outline: "none"}}>
        <Row rowChars={char[0]} rowColors={color[0]}/>
        <Row rowChars={char[1]} rowColors={color[1]}/>
        <Row rowChars={char[2]} rowColors={color[2]}/>
        <Row rowChars={char[3]} rowColors={color[3]}/>
        <Row rowChars={char[4]} rowColors={color[4]}/>
        <Row rowChars={char[5]} rowColors={color[5]}/>
      </div>
    </div>
  )
}

export default App;
