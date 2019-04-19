import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
    updateUnusedTiles,
    dealPlayerTiles
} from '../actions'

import Submit from './Submit'
import Shuffle from './Shuffle'

class ControlPanel extends Component {
    componentDidMount() {
        this.createHand(7)
    }

    createHand = (num) => {
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
            this.props.dealPlayerTiles(playerTiles)
        }  
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Submit createHand={ this.createHand } />
                <Shuffle />
                <button>exchange</button>
                <button>pass</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    unusedTiles: state.tile.unusedTiles
})

const mapDispatchToProps = (dispatch) => ({
    dealPlayerTiles: (tiles) => dispatch(dealPlayerTiles(tiles)),
    updateUnusedTiles: (tiles) => dispatch(updateUnusedTiles(tiles)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)