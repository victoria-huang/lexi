import React, { Component } from 'react'

import { connect } from 'react-redux'

import Login from './components/Login'
import GameContainer from './components/GameContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{ border: '1px solid black', padding: '2px' }}>l e x i .</h1>
        { this.props.playerOne && this.props.playerTwo ?
          <GameContainer />
          :
          <Login />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerOne: state.game.playerOne,
  playerTwo: state.game.playerTwo
})

export default connect(mapStateToProps)(App)
