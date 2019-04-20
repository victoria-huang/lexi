import React from 'react'

import { connect } from 'react-redux'
import { 
    addToHand,
    removeFromHand,
    updateUnusedTiles,
    deselectTile,
    setExchanged
 } from '../actions'

const Exchange = (props) => {
    const exchangeTile = () => {
        const selectedTile = props.playerTiles.find(pt => pt.id === props.selected)
        const unusedTiles = [...props.unusedTiles]
        const max = unusedTiles.length - 1
        const min = 0
        const randomIndex = Math.floor(Math.random() * (max - min) + min)
        const randomTile = unusedTiles[randomIndex]
        unusedTiles[randomIndex] = selectedTile

        props.deselectTile()
        props.removeFromHand(selectedTile)
        props.addToHand(randomTile)
        props.updateUnusedTiles(unusedTiles)
        props.setExchanged()
    }

    return (
        <button onClick={ exchangeTile }>exchange</button>
    )
}

const mapStateToProps = (state) => ({
    unusedTiles: state.tile.unusedTiles,
    playerTiles: state.tile.playerTiles,
    selected: state.tile.selected
})

const mapDispatchToProps = (dispatch) => ({
    addToHand: (tile) => dispatch(addToHand(tile)),
    removeFromHand: (tile) => dispatch(removeFromHand(tile)),
    updateUnusedTiles: (tiles) => dispatch(updateUnusedTiles(tiles)),
    deselectTile: () => dispatch(deselectTile()),
    setExchanged: () => dispatch(setExchanged())
})

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)