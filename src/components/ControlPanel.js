import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
    updateUnusedTiles,
    dealPlayerTiles,
    switchTurn,
    endGame,
    resetExchanged,
    deselectTile
} from '../actions'

import Submit from './Submit'
import Shuffle from './Shuffle'
import Exchange from './Exchange'
import TileBag from './TileBag'
import EndGame from './EndGame'

class ControlPanel extends Component {
    componentDidMount() {
        Promise.resolve()
        .then(() => this.createHand(7, 1))
        .then(() => this.createHand(7, 2))
    }

    createHand = (num, player) => {
        if (this.props.unusedTiles.length >= num) {
            let playerTiles = []
            let unusedTiles = [...this.props.unusedTiles]
    
            for (let i = 0; i < num; i++) {
                const max = unusedTiles.length - 1
                const min = 0
                const randomIndex = Math.floor(Math.random() * (max - min) + min)
                const foundTile = unusedTiles[randomIndex]
                playerTiles.push(foundTile)
                unusedTiles = unusedTiles.filter(t => t !== foundTile)
            }
            
            this.props.updateUnusedTiles(unusedTiles)
            this.props.dealPlayerTiles(playerTiles, player)
        } else {
            this.props.endGame()
        }
    }

    handlePass = () => {
        this.props.switchTurn()
        this.props.resetExchanged()
        this.props.deselectTile()
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Submit createHand={ this.createHand } />
                <Shuffle />
                { (this.props.selected && !this.props.exchanged) && <Exchange /> }
                <TileBag />
                <button onClick={ this.handlePass }>pass</button>
                <EndGame />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    unusedTiles: state.tile.unusedTiles,
    selected: state.tile.selected,
    exchanged: state.game.exchanged
})

const mapDispatchToProps = (dispatch) => ({
    dealPlayerTiles: (tiles, player) => dispatch(dealPlayerTiles(tiles, player)),
    updateUnusedTiles: (tiles) => dispatch(updateUnusedTiles(tiles)),
    switchTurn: () => dispatch(switchTurn()),
    resetExchanged: () => dispatch(resetExchanged()),
    deselectTile: () => dispatch(deselectTile()),
    endGame: () => dispatch(endGame())
})


export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)