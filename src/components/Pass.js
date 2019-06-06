import React from 'react'

import { connect } from 'react-redux'

import { 
    addToHand,
    updateCells,
    resetExchanged,
    deselectTile,
    clearTryTiles,
    switchTurn,
} from '../actions'

const Pass = ({
    addToHand,
    updateCells,
    resetExchanged,
    deselectTile,
    clearTryTiles,
    switchTurn,
    tryTiles,
    cells,
    gameId,
    whoseTurn
}) => {
    const handlePass = () => {
        const copyCells = cells.map(cell => {
            if (tryTiles.find(tile => tile._id === cell.tileId)) {
                return { ...cell, tileId: null, value: null, points: null }
            } else return cell
        })

        const tryTilePromises = tryTiles.map(tile => addToHand(gameId, tile, whoseTurn))
        
        updateCells(gameId, copyCells)
        .then(() => {
            Promise.all(tryTilePromises)
            .then(() => {
                Promise.all([resetExchanged(gameId), deselectTile(gameId), clearTryTiles(gameId)])
                .then(() => switchTurn(gameId))
            })
        })
    }

    return (
        <button onClick={ handlePass }>pass</button>
    )
}

const mapStateToProps = (state) => ({
    gameId: state.game.gameId,
    tryTiles: state.tile.tryTiles,
    cells: state.cell.allCells,
    whoseTurn: state.game.whoseTurn
})

export default connect(mapStateToProps, {
    addToHand,
    updateCells,
    resetExchanged,
    deselectTile,
    clearTryTiles,
    switchTurn
})(Pass)