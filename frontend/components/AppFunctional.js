import React, { useState } from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  let array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [board, setBoard] = useState([0,0,0,0,1,0,0,0,0]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [steps, setSteps] = useState(0);
  const [active, setActive] = useState(4);


  const squareClass = (currentNumber) => {
    switch(currentNumber) {
      case 0: return 'square';
      case 1: return 'square active';
    }
  }

  const fillSquare = (currentNumber) => {
    switch(currentNumber) {
      case 0: return '';
      case 1: return 'B';
    }
  }

  const movementCheck = (direction) => {
    switch(direction) {
      case 'up':
        return [0,1,2];
      case 'left':
        return [0,3,6];
      case 'right':
        return [2,5,8];
      case 'down':
        return [6,7,8];      
    }
  }

  const changeGridPosition = (position) => {
    array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    array1[position] = 1;
    return array1;
  }

  const onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    setEmail(value);
  }

  const getXPosition = (position) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    switch(position) {
      case 0: return 1;
      case 1: return 2;
      case 2: return 3;
      case 3: return 1;
      case 4: return 2;
      case 5: return 3;
      case 6: return 1;
      case 7: return 2;
      case 8: return 3;

    }
  }

  const getYPosition = (position) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    switch(position) {
      case 0: return 1;
      case 1: return 1;
      case 2: return 1;
      case 3: return 2;
      case 4: return 2;
      case 5: return 2;
      case 6: return 3;
      case 7: return 3;
      case 8: return 3;

    }
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  const reset = () => {
    // helper to reset all states to their initial values.
    setBoard([0,0,0,0,1,0,0,0,0]);
    setMessage('');
    setEmail('');
    setSteps(0);
    setActive(4);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  const move = (position, direction) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    let errorLimit = movementCheck(direction);
    let stepCounter = steps;
    let holder = active;
    let newGrid = [];

    if(errorLimit.includes(position)) {
      setMessage(`You can't go ${direction}`)
    }
  
  else {
    switch(direction) {
      case 'up':
        holder -= 3;
        newGrid = changeGridPosition(holder);
        stepCounter += 1;
        setActive(holder);
        setSteps(stepCounter); 
        setBoard(newGrid);  
        break;
      case 'left':
        holder -= 1;
        newGrid = changeGridPosition(holder);
        stepCounter += 1;
        setActive(holder);
        setSteps(stepCounter); 
        setBoard(newGrid); 
        break;
      case 'right':
        holder += 1;
        newGrid = changeGridPosition(holder);
        stepCounter += 1;
        setActive(holder);
        setSteps(stepCounter); 
        setBoard(newGrid); 
        break;
      case 'down':
        holder += 3;
        newGrid = changeGridPosition(holder);
        stepCounter += 1;
        setActive(holder);
        setSteps(stepCounter); 
        setBoard(newGrid); 
        break;
    }
  }
  }

  const onSubmit1 = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    // this.props

    axios.post(`http://localhost:9000/api/result`, {
      email: email,
      steps: steps,
      x: getXPosition(active),
      y: getYPosition(active),
    })
    .then(res => {
      setMessage(res.data.message);
      setEmail('');
      evt.preventDefault();
    })
    .catch(err => {
      // setMessage(err.response.data.message);
      if(email === '') {
        setMessage('Ouch: email is required');
        setEmail('');
      }
      else if(email[email.length -4 !== '.']) {
        setMessage('Ouch: email must be a valid email');
        setEmail('');
      }
      else {
        setMessage(`${email} failure #71`);
        setEmail('');
      }})

      evt.preventDefault(); 
    }
  
 

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({getXPosition(active)},{getYPosition(active)})</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {
          board.map(each => {
            return (
              <div className={squareClass(each)}>{fillSquare(each)}</div>
          )})
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
          <button id="left" onClick={()=>{move(active,"left")}}>LEFT</button>
          <button id="up" onClick={()=>{move(active,"up")}}>UP</button>
          <button id="right" onClick={()=>{move(active,"right")}}>RIGHT</button>
          <button id="down" onClick={()=>{move(active,"down")}}>DOWN</button>
          <button id="reset" onClick={()=>reset()}>reset</button>
      </div>
      <form onSubmit={onSubmit1}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
