import React, { useState } from 'react';
import axios from 'axios';
import { array } from 'yup';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialX = 2 
const initialY = 2
const initialActive = 4

const initialState = {
  message: '',
  email: '',
  steps: 0,
  active: 4,
  // x: initialX,
  // y: initialY,
  board: [0, 0, 0, 0, 1, 0, 0, 0, 0]
}

let array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  state = initialState;

  squareClass = (currentNumber) => {
    switch(currentNumber) {
      case 0: return 'square';
      case 1: return 'square active';
    }
  }

  fillSquare = (currentNumber) => {
    switch(currentNumber) {
      case 0: return '';
      case 1: return 'B';
    }
  }

  movementCheck = (direction) => {
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

  changeGridPosition = (position) => {
    array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    array1[position] = 1;
    return array1;
  }

  // constructor(props) {
  //   super();
  //   this.state = initialState;
  // }

  // const [formValues, setFormValues] = useState(initialValue);


  getXY = (position) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

  //   const gridCoordinate = document.getElementsByClassName('square');
    switch(position) {
      case 0: return [1,1];
      case 1: return [2,1];
      case 2: return [3,1];
      case 3: return [1,2];
      case 4: return [2,2];
      case 5: return [3,2];
      case 6: return [1,3];
      case 7: return [2,3];
      case 8: return [3,3];

    }
  }

  //   if(this.state.x === 1 && this.state.y === 1) {
  //     gridCoordinate[0].classList.add('active');
  //     gridCoordinate[0].textContent = 'B';
  //   }
  //   else if(this.state.x === 2 && this.state.y === 1) {
  //     gridCoordinate[1].classList.add('active');
  //     gridCoordinate[1].textContent = 'B';
  //   }
  //   else if(this.state.x === 3 && this.state.y === 1) {
  //     gridCoordinate[2].classList.add('active');
  //     gridCoordinate[2].textContent = 'B';
  //   }
  //   else if(this.state.x === 1 && this.state.y === 2) {
  //     gridCoordinate[3].classList.add('active');
  //     gridCoordinate[3].textContent = 'B';
  //   }
  //   else if(this.state.x === 2 && this.state.y === 2) {
  //     gridCoordinate[4].classList.add('active');
  //     gridCoordinate[4].textContent = 'B';
  //   }
  //   else if(this.state.x === 3 && this.state.y === 2) {
  //     gridCoordinate[5].classList.add('active');
  //     gridCoordinate[5].textContent = 'B';
  //   }
  //   else if(this.state.x === 1 && this.state.y === 3) {
  //     gridCoordinate[6].classList.add('active');
  //     gridCoordinate[6].textContent = 'B';
  //   }
  //   else if(this.state.x === 2 && this.state.y === 3) {
  //     gridCoordinate[7].classList.add('active');
  //     gridCoordinate[7].textContent = 'B';
  //   }
  //   else if(this.state.x === 3 && this.state.y === 3) {
  //     gridCoordinate[8].classList.add('active');
  //     gridCoordinate[8].textContent = 'B';
  //   }
  // }

  // componentDidUpdate(prevProps, prevState){
  //   if(prevState.x !== this.state.x || prevState.y !== this.state.y) {
  //     this.move(this.state.x, this.state.y); 
  //   }
  

  // getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  // }

  reset = (e) => {
    // Use this helper to reset all states to their initial values.
    e.preventDefault();
    this.setState(initialState);
  }

  // getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    // Done all in 'move' as it seemed to be easier to update coordinates at the same time as button is pressed
  // }

  move = (position, direction) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    // const newBoard = [ ...this.state.board ]
    // newBoard[evt] = this.state
    // const clickedButton = evt.target.textContent;

    // console.log(evt.target.textContent);
    // console.log(this.state.x);
    // console.log(this.state.y);

    // const newBoard = [ ...this.state.board];
    // newBoard[evt] = this.state.


    let errorLimit = this.movementCheck(direction);
    let stepCounter = this.state.steps;
    let holder = this.state.active;
    let newGrid = [];

    if(errorLimit.includes(position)) {
      this.setState({ ...this.state, message: `You can't go ${direction}`
      })
    }

    else {
    switch(direction) {
      case 'up':
        // if(this.state.y === 1) {
        //   this.setState({ ...this.state, error: `You can't go up`})
        // } else {

        holder -= 3;
        newGrid = this.changeGridPosition(holder);
        stepCounter += 1;
        this.setState({ 
          ...this.state,
          active: holder,
          steps: stepCounter, 
          board: newGrid  
        });
        // }
        break;
      case 'left':
        // if(this.state.x === 1) {
        //   this.setState({ ...this.state, error: `You can't go left`})
        // } else {
        //   this.setState({ ...this.state, error: '', y: this.state.x - 1, steps: this.state.steps + 1})
        // }
        holder -= 1;
        newGrid = this.changeGridPosition(holder);
        stepCounter += 1;
        this.setState({ 
          ...this.state,
          active: holder,
          steps: stepCounter, 
          board: newGrid  
        });
        break;
      case 'right':
        // if(this.state.x === 3) {
        //   this.setState({ ...this.state, error: `You can't go right`})
        // } else {
        //   this.setState({ ...this.state, error: '', y: this.state.x + 1, steps: this.state.steps + 1})
        // }
        holder += 1;
        newGrid = this.changeGridPosition(holder);
        stepCounter += 1;
        this.setState({ 
          ...this.state,
          active: holder,
          steps: stepCounter, 
          board: newGrid  
        });
        break;
      case 'down':
        // if(this.state.y === 3) {
        //   this.setState({ ...this.state, error: `You can't go down`})
        // } else {
        //   this.setState({ ...this.state, error: '', y: this.state.y + 1, steps: this.state.steps + 1})
        // }
        holder += 3;
        newGrid = this.changeGridPosition(holder);
        stepCounter += 1;
        this.setState({ 
          ...this.state,
          active: holder,
          steps: stepCounter, 
          board: newGrid  
        });
        break;
    }
  }
    

  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      email: evt.target.value
    });
  }



  

  render() {
    const { className } = this.props
    const { message, email, steps, active, board } = this.state
    let [x, y] = this.getXY(active)

    const onSubmit = (evt) => {
      // Use a POST request to send a payload to the server.
      evt.preventDefault();
      // this.props
  
      axios.post(`http://localhost:9000/api/result`, {email: this.state.email,
        steps: steps,
        x: x,
        y: y,
        email: email 
      })
      .then(res => {
        this.setState({
          ...this.state, message: res.data.message, email: ''
        })
      })
      .catch(() => {
        if(this.state.email === '') {
          this.setState({ ...this.state, message: 'Ouch: email is required'})
        }
        else if(this.state.email[this.state.email.length -4 !== '.']) {
          this.setState({ ...this.state, message: 'Ouch: email must be a valid email'})
        }
        else {
          this.setState({
            ...this.state,
            message: `${this.state.email} failure #71`,
            email: ''
          })
        }
      })
    }

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x},{y})</h3>
          <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            // [0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
              board.map(each => {
                return (
                  <div className={this.squareClass(each)}>{this.fillSquare(each)}</div>
              )})
          }
           
              {/* // <div onClick={() => this.move(idx)} key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              //   {idx === 4 ? 'B' : null}
              // </div>
              // );
            // })} */}
          {/* <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square active'>B</div> {/* B is starting point!*/}
          {/* <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div> */} 
         </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => {this.move(active, 'left')}}>LEFT</button>
          <button id="up" onClick={() => {this.move(active, 'up')}}>UP</button>
          <button id="right" onClick={() => {this.move(active, 'right')}}>RIGHT</button>
          <button id="down" onClick={() => {this.move(active, 'down')}}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input id="email" type="email" value={this.state.email} placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
