import React from 'react'

import { connect } from 'react-redux'
import { shufflePlayerTiles } from '../actions'

const Shuffle = (props) => {
    const shuffleHand = () => {
        const tiles = [...props.playerTiles]

        let i, j, temp

        for (i = tiles.length - 1; i > 0; i -=1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = tiles[i]
            tiles[i] = tiles[j]
            tiles[j] = temp
        }

        props.shufflePlayerTiles(tiles)
    }

    return (
        <button onClick={ shuffleHand }>shuffle</button>
    )
}

const mapStateToProps = (state) => ({
    playerTiles: state.tile.playerTiles
})

const mapDispatchToProps = (dispatch) => ({
    shufflePlayerTiles: (tiles) => dispatch(shufflePlayerTiles(tiles))
})

export default connect(mapStateToProps, mapDispatchToProps)(Shuffle)