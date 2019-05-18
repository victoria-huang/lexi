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
    setExchanged,
    gameId
}) => {
    const exchangeTile = () => {
        const selectedTile = playerTiles.find(pt => pt._id === selected)
        const copyUnusedTiles = [...unusedTiles]
        const max = copyUnusedTiles.length - 1
        const min = 0
        const randomIndex = Math.floor(Math.random() * (max - min) + min)
        const randomTile = copyUnusedTiles[randomIndex]
        copyUnusedTiles[randomIndex] = selectedTile

        deselectTile(gameId)
        removeFromHand(gameId, selectedTile, whoseTurn)
        addToHand(gameId, randomTile, whoseTurn)
        updateUnusedTiles(gameId, copyUnusedTiles)
        setExchanged(gameId)
    }

    return (
        <button onClick={ exchangeTile }>exchange</button>
    )
}

const mapStateToProps = (state) => ({
    gameId: state.game.gameId,
    unusedTiles: state.tile.unusedTiles,
    playerTiles: state.tile.playerTiles,
    selected: state.tile.selected,
    whoseTurn: state.game.whoseTurn
})

const mapDispatchToProps = (dispatch) => ({
    addToHand: (gameId, tile, player) => dispatch(addToHand(gameId, tile, player)),
    removeFromHand: (gameId, tile, player) => dispatch(removeFromHand(gameId, tile, player)),
    updateUnusedTiles: (gameId, tiles) => dispatch(updateUnusedTiles(gameId, tiles)),
    deselectTile: (gameId) => dispatch(deselectTile(gameId)),
    setExchanged: (gameId) => dispatch(setExchanged(gameId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)