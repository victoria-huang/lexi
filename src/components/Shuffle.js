import React from 'react'

import { connect } from 'react-redux'
import { shufflePlayerTiles } from '../actions'

const Shuffle = (props) => {
    const shuffleHand = () => {
        const playerTiles = ( props.whoseTurn === 1 ? props.p1Tiles : props.p2Tiles )
        const tiles = [...playerTiles]

        let i, j, temp

        for (i = tiles.length - 1; i > 0; i -=1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = tiles[i]
            tiles[i] = tiles[j]
            tiles[j] = temp
        }

        props.shufflePlayerTiles(tiles, this.props.whoseTurn)
    }

    return (
        <button onClick={ shuffleHand }>shuffle</button>
    )
}

const mapStateToProps = (state) => ({
    p1Tiles: state.tile.p1Tiles,
    p2Tiles: state.tile.p2Tiles,
    whoseTurn: state.game.whoseTurn
})

const mapDispatchToProps = (dispatch) => ({
    shufflePlayerTiles: (tiles, player) => dispatch(shufflePlayerTiles(tiles, player))
})

export default connect(mapStateToProps, mapDispatchToProps)(Shuffle)