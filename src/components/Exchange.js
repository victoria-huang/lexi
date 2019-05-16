import React from 'react'

import { connect } from 'react-redux'
import { 
    addToHand,
    removeFromHand,
    updateUnusedTiles,
    deselectTile,
    setExchanged
 } from '../actions'

const Exchange = ({
    unusedTiles,
    playerTiles,
    selected,
    whoseTurn,
    addToHand,
    removeFromHand,
    updateUnusedTiles,
    deselectTile,
    setExchanged
}) => {
    const exchangeTile = () => {
        const selectedTile = playerTiles.find(pt => pt._id === selected)
        const copyUnusedTiles = [...unusedTiles]
        const max = copyUnusedTiles.length - 1
        const min = 0
        const randomIndex = Math.floor(Math.random() * (max - min) + min)
        const randomTile = copyUnusedTiles[randomIndex]
        copyUnusedTiles[randomIndex] = selectedTile

        deselectTile()
        removeFromHand(selectedTile, whoseTurn)
        addToHand(randomTile, whoseTurn)
        updateUnusedTiles(copyUnusedTiles)
        setExchanged()
    }

    return (
        <button onClick={ exchangeTile }>exchange</button>
    )
}

const mapStateToProps = (state) => ({
    unusedTiles: state.tile.unusedTiles,
    playerTiles: state.tile.playerTiles,
    selected: state.tile.selected,
    whoseTurn: state.game.whoseTurn
})

const mapDispatchToProps = (dispatch) => ({
    addToHand: (tile, player) => dispatch(addToHand(tile, player)),
    removeFromHand: (tile, player) => dispatch(removeFromHand(tile, player)),
    updateUnusedTiles: (tiles) => dispatch(updateUnusedTiles(tiles)),
    deselectTile: () => dispatch(deselectTile()),
    setExchanged: () => dispatch(setExchanged())
})

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)