import { ALL_TILES } from '../constants'
import {
    SELECT_TILE,
    DESELECT_TILE,
    ADD_TO_HAND,
    REMOVE_FROM_HAND,
    ADD_TRY_TILE,
    REMOVE_TRY_TILE,
    CLEAR_TRY_TILES,
    DEAL_PLAYER_TILES,
    UPDATE_UNUSED_TILES,
    UPDATE_USED_TILES,
    SHUFFLE_PLAYER_TILES
} from '../constants/ActionTypes'

const initialState = {
    unusedTiles: ALL_TILES,
    tryTiles: [],
    playerTiles: [],
    p1Tiles: [],
    p2Tiles: [],
    usedTiles: [],
    selected: null
}

export default (state = initialState, action) => {
    let key

    switch(action.type) {
        case SELECT_TILE:
            return {
                ...state,
                selected: action.payload
            }
        case DESELECT_TILE:
            return {
                ...state,
                selected: null
            }
        case ADD_TO_HAND:
            key = ( action.payload.player === 1 ? 'p1Tiles' : 'p2Tiles' )

            return {
                ...state,
                playerTiles: state.playerTiles.concat(action.payload.tile),
                [key]: state[key].concat(action.payload.tile.id)
            }
        case REMOVE_FROM_HAND:
            key = ( action.payload.player === 1 ? 'p1Tiles' : 'p2Tiles' )

            return {
                ...state, 
                playerTiles: state.playerTiles.filter(pt => pt.id !== action.payload.tile.id),
                [key]: state[key].filter(tileId => tileId !== action.payload.tile.id )
            }
        case ADD_TRY_TILE:
            return {
                ...state,
                tryTiles: state.tryTiles.concat(action.payload)
            }
        case REMOVE_TRY_TILE:
            return {
                ...state,
                tryTiles: state.tryTiles.filter(t => t.id !== action.payload.id)
            }
        case CLEAR_TRY_TILES:
            return {
                ...state,
                tryTiles: []
            }
        case DEAL_PLAYER_TILES:
            key = ( action.payload.player === 1 ? 'p1Tiles' : 'p2Tiles' )
            const tileIds = action.payload.tiles.map( t => t.id )

            return {
                ...state,
                playerTiles: state.playerTiles.concat(action.payload.tiles),
                [key]: state[key].concat(tileIds)
            }
        case UPDATE_UNUSED_TILES:
            return {
                ...state,
                unusedTiles: action.payload
            }
        case UPDATE_USED_TILES:
            return {
                ...state,
                usedTiles: state.usedTiles.concat(action.payload)
            }
        case SHUFFLE_PLAYER_TILES:
            key = ( action.payload.player === 1 ? 'p1Tiles' : 'p2Tiles' )

            return {
                ...state,
                [key]: action.payload.tiles
            }
        default:
            return state
    }
}