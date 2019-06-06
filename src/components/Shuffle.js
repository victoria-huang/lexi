import React from 'react'

import { connect } from 'react-redux'

import { shufflePlayerTiles } from '../actions'

const Shuffle = ({ 
    p1Tiles, 
    p2Tiles, 
    whoseTurn, 
    shufflePlayerTiles,
    gameId 
}) => {
    const shuffleHand = () => {
        const playerTiles = ( whoseTurn === 1 ? p1Tiles : p2Tiles )
        const tiles = [...playerTiles]

        let i, j, temp

        for (i = tiles.length - 1; i > 0; i -=1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = tiles[i]
            tiles[i] = tiles[j]
            tiles[j] = temp
        }

        shufflePlayerTiles(gameId, tiles, whoseTurn)
    }

    return (
        <button onClick={ shuffleHand }>shuffle</button>
    )
}

const mapStateToProps = (state) => ({
    gameId: state.game.gameId,
    p1Tiles: state.tile.p1Tiles,
    p2Tiles: state.tile.p2Tiles,
    whoseTurn: state.game.whoseTurn
})

export default connect(mapStateToProps, { shufflePlayerTiles })(Shuffle)