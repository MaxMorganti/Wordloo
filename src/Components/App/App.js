import './App.css';
import '../../reset.css'
import {Tile} from '../Tile/Tile';
import React, {useState} from 'react';

const correctWord = ['C','R','E','A','T','E'];
let posIndex = 0;

function App() {
 
  const [char,setChar] = useState(['','','','','','']);
  const [color,setColor] = useState(['white','white','white','white','white','white']);

  const handleKeyDown = (event) => {
      
    //handle backspace
      if(event.key === 'Backspace') {
        if(posIndex === 0) return;
        posIndex--;
        setChar( prev => {
          let newChars = prev.slice();
          newChars[posIndex] = '';
          return newChars;
        });
        return;
      } 

      //keep input from going out of bounds
      if(posIndex === 6) return;
      //validate only alphabetical chars
      if(event.keyCode > 90 || event.keyCode < 65) return;

      posIndex++;
      setChar( prev => {
        let newChars = prev.slice();
        newChars[posIndex - 1] = event.key.toUpperCase();
        return newChars;
      }); 
  }

  const handleSubmit = () => {
    checkInput(char,correctWord);
    //if(char === correctLetter) {
    // setColor('lightgreen');
    //}
  }

  const checkInput = (inputArray,correctArray) => {
    
    //mark the greens first
    for(let i = 0; i <= 5; i++) {
      if(inputArray[i] === correctArray[i]) {
        setColor( prev => {
          let newColors = prev.slice();
          newColors[i] = 'lightgreen';
          return newColors;
        });
      }      
    }

    //then mark yellow
    for(let i = 0; i <=5; i++) {
      if(correctArray.includes(inputArray[i]) && inputArray[i] !== correctArray[i]) {
        setColor( prev => {
          let newColors = prev.slice();
          newColors[i] = 'yellow';
          return newColors;
        });
      }
    }
  }

  return (
    <div onKeyDown={handleKeyDown} tabIndex="0" style={{outline: "none"}}>
      <Tile color={color[0]} char={char[0]}/>
      <Tile color={color[1]} char={char[1]}/>
      <Tile color={color[2]} char={char[2]}/>
      <Tile color={color[3]} char={char[3]}/>
      <Tile color={color[4]} char={char[4]}/>
      <Tile color={color[5]} char={char[5]}/>
      <br/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App;
