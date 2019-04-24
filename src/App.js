import React, { Component } from 'react'

import { connect } from 'react-redux'

import Login from './components/Login'
import GameContainer from './components/GameContainer'

import './App.css'

class App extends Component {
  render() {
    return (
      <>
        { this.props.playerOne && this.props.playerTwo ?
          <GameContainer />
          :
          <Login />
        }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  playerOne: state.game.playerOne,
  playerTwo: state.game.playerTwo
})

export default connect(mapStateToProps)(App)
