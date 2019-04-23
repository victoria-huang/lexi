import * as types from '../constants/ActionTypes'

/************ ERROR ************/

export const addErrors = (error) => ({
    type: types.ADD_ERRORS,
    payload: error
})

export const clearErrors = () => ({
    type: types.CLEAR_ERRORS
})

/************ CELL ************/

export const updateCells = (cells) => ({
    type: types.UPDATE_CELLS,
    payload: cells
})

export const setUsedCells = (cellIds) => ({
    type: types.SET_USED_CELLS,
    payload: cellIds
})

/************ TILE ************/

export const selectTile = (tile) => ({
    type: types.SELECT_TILE,
    payload: tile
})

export const deselectTile = () => ({
    type: types.DESELECT_TILE
})

export const addToHand = (tile) => ({
    type: types.ADD_TO_HAND,
    payload: tile
})

export const removeFromHand = (tile) => ({
    type: types.REMOVE_FROM_HAND,
    payload: tile
})

export const addTryTile = (tile) => ({
    type: types.ADD_TRY_TILE,
    payload: tile
})

export const removeTryTile = (tile) => ({
    type: types.REMOVE_TRY_TILE,
    payload: tile
})

export const clearTryTiles = () => ({
    type: types.CLEAR_TRY_TILES
})

export const dealPlayerTiles = (tiles) => ({
    type: types.DEAL_PLAYER_TILES,
    payload: tiles
})

export const shufflePlayerTiles = (tiles) => ({
    type: types.SHUFFLE_PLAYER_TILES,
    payload: tiles
})

export const updateUnusedTiles = (tiles) => ({
    type: types.UPDATE_UNUSED_TILES,
    payload: tiles
})

export const updateUsedTiles = (tiles) => ({
    type: types.UPDATE_UNUSED_TILES,
    payload: tiles
})

/************ GAME ************/

export const addPoints = (points) => ({
    type: types.ADD_POINTS,
    payload: points
})

export const setExchanged = () => ({
    type: types.SET_EXCHANGED
})

export const resetExchanged = () => ({
    type: types.RESET_EXCHANGED
})

export const login = (playerOne, playerTwo) => ({
    type: types.LOGIN,
    payload: {
        playerOne,
        playerTwo
    }
})

export const switchTurn = () => ({
    type: types.SWITCH_TURN
})