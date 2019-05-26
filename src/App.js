import React, { Component } from 'react'

import Modal from 'react-modal'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Splash from './components/Splash'
import Home from './components/Home'
import GameContainer from './components/GameContainer'

import './App.scss'

Modal.setAppElement('#root')

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/login' render={ (routeProps) => <Splash {...routeProps} /> } />
        <Route path='/game' render={ (routeProps) => <GameContainer {...routeProps} /> } />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  playerOne: state.game.playerOne,
  playerTwo: state.game.playerTwo
})

export default connect(mapStateToProps)(withRouter(App))
