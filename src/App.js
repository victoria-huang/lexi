import React, { Component } from 'react';
import GameContainer from './components/GameContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{ border: '1px solid black', padding: '2px' }}>l e x i .</h1>
        <GameContainer />
      </div>
    );
  }
}

export default App;
