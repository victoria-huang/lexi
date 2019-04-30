import React, { Component } from 'react'
import Modal from 'react-modal'

import { connect } from 'react-redux'

import Login from './components/Login'
import GameContainer from './components/GameContainer'

import './App.css'

Modal.setAppElement('#root')

class App extends Component {
  render() {
    return (
      <>
        { 
          this.props.playerOne && this.props.playerTwo ?
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
