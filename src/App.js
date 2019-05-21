import React, { Component } from 'react'

import Modal from 'react-modal'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import GameContainer from './components/GameContainer'

import './App.css'

Modal.setAppElement('#root')

class App extends Component {
  render() {
    return (
      <>
      { !['/login', '/register', '/game'].includes(this.props.location.pathname) && <Nav /> }

      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/login' render={ (routeProps) => <Login {...routeProps} /> } />
        <Route path='/register' component={ Register } />
        <Route path='/game' render={ (routeProps) => <GameContainer {...routeProps} /> } />
      </Switch>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  playerOne: state.game.playerOne,
  playerTwo: state.game.playerTwo
})

export default connect(mapStateToProps)(withRouter(App))
