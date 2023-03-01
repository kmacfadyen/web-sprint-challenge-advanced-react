import React, { useState } from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialX = 2 
const initialY = 2

const initialState = {
  message: initialMessage,
  email: initialEmail,
  steps: initialSteps,
  x: initialX,
  y: initialY
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  state = initialState;

  // constructor(props) {
  //   super();
  //   this.state = initialState;
  // }

  // const [formValues, setFormValues] = useState(initialValue);


  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    const gridCoordinate = document.getElementsByClassName('square');

    

    if(this.state.x === 1 && this.state.y === 1) {
      gridCoordinate[0].classList.add('active');
      gridCoordinate[0].textContent = 'B';
    }
    else if(this.state.x === 2 && this.state.y === 1) {
      gridCoordinate[1].classList.add('active');
      gridCoordinate[1].textContent = 'B';
    }
    else if(this.state.x === 3 && this.state.y === 1) {
      gridCoordinate[2].classList.add('active');
      gridCoordinate[2].textContent = 'B';
    }
    else if(this.state.x === 1 && this.state.y === 2) {
      gridCoordinate[3].classList.add('active');
      gridCoordinate[3].textContent = 'B';
    }
    else if(this.state.x === 2 && this.state.y === 2) {
      gridCoordinate[4].classList.add('active');
      gridCoordinate[4].textContent = 'B';
    }
    else if(this.state.x === 3 && this.state.y === 2) {
      gridCoordinate[5].classList.add('active');
      gridCoordinate[5].textContent = 'B';
    }
    else if(this.state.x === 1 && this.state.y === 3) {
      gridCoordinate[6].classList.add('active');
      gridCoordinate[6].textContent = 'B';
    }
    else if(this.state.x === 2 && this.state.y === 3) {
      gridCoordinate[7].classList.add('active');
      gridCoordinate[7].textContent = 'B';
    }
    else if(this.state.x === 3 && this.state.y === 3) {
      gridCoordinate[8].classList.add('active');
      gridCoordinate[8].textContent = 'B';
    }
  }

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

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    switch(evt.target.textContent) {
      case 'UP':
        if(this.state.y === 1) {
          this.setState({ ...this.state, error: `You can't go up`})
        } else {
          this.setState({ ...this.state, error: '', y: this.state.y - 1, steps: this.state.steps + 1})
        }
        break
      case 'LEFT':
        if(this.state.y === 1) {
          this.setState({ ...this.state, error: `You can't go left`})
        } else {
          this.setState({ ...this.state, error: '', y: this.state.x - 1, steps: this.state.steps + 1})
        }
        break
      case 'RIGHT':
        if(this.state.y === 1) {
          this.setState({ ...this.state, error: `You can't go right`})
        } else {
          this.setState({ ...this.state, error: '', y: this.state.x + 1, steps: this.state.steps + 1})
        }
        break
      case 'DOWN':
        if(this.state.y === 3) {
          this.setState({ ...this.state, error: `You can't go down`})
        } else {
          this.setState({ ...this.state, error: '', y: this.state.y + 1, steps: this.state.steps + 1})
        }
        break
    }
    
    

  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      email: evt.target.value
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.x !== this.state.x || prevState.y !== this.state.y) {
      this.move(this.state.x, this.state.y); 
    }
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    // this.props
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y}) </h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {/* {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))          Made it simpler to read for myself
          } */}
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square active'>B</div> {/* B is starting point!*/}
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" value={this.state.email} placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
