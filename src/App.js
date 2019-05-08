import React, { Component } from 'react'

import Modal from 'react-modal'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './components/Login'
import GameContainer from './components/GameContainer'

import './App.css'

Modal.setAppElement('#root')

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' render={ (routeProps) => <Login {...routeProps} /> } />
        <Route path='/game' component={ GameContainer } />

      {/*<>
        { 
          this.props.playerOne && this.props.playerTwo ?
          <GameContainer />
          :
          <Login />
        }
      </>*/}
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  playerOne: state.game.playerOne,
  playerTwo: state.game.playerTwo
})

export default connect(mapStateToProps)(App)
