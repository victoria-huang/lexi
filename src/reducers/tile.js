import {
    SET_GAME,
    SET_UNUSED_TILES,
    SELECT_TILE,
    DESELECT_TILE,
    ADD_TO_HAND,
    REMOVE_FROM_HAND,
    ADD_TRY_TILE,
    REMOVE_TRY_TILE,
    CLEAR_TRY_TILES,
    DEAL_PLAYER_TILES,
    UPDATE_USED_TILES,
    SHUFFLE_PLAYER_TILES,
    CLEAR_GAME
} from '../constants/ActionTypes'

const initialState = {
    unusedTiles: [],
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
        case SET_GAME:
            const {
                unusedTiles,
                tryTiles,
                playerTiles,
                p1Tiles,
                p2Tiles,
                usedTiles,
                selected
            } = action.payload.tiles

            const p1TileIds = p1Tiles.map(tile => tile._id)
            const p2TileIds = p2Tiles.map(tile => tile._id)

            return {
                unusedTiles,
                tryTiles,
                playerTiles,
                p1Tiles: p1TileIds,
                p2Tiles: p2TileIds,
                usedTiles,
                selected
            }
        case SET_UNUSED_TILES:
            return {
                ...state,
                unusedTiles: action.payload
            }
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
                [key]: state[key].concat(action.payload.tile._id)
            }
        case REMOVE_FROM_HAND:
            key = ( action.payload.player === 1 ? 'p1Tiles' : 'p2Tiles' )

            return {
                ...state, 
                playerTiles: state.playerTiles.filter(pt => pt._id !== action.payload.tile._id),
                [key]: state[key].filter(tileId => tileId !== action.payload.tile._id )
            }
        case ADD_TRY_TILE:
            return {
                ...state,
                tryTiles: state.tryTiles.concat(action.payload)
            }
        case REMOVE_TRY_TILE:
            return {
                ...state,
                tryTiles: state.tryTiles.filter(t => t._id !== action.payload._id)
            }
        case CLEAR_TRY_TILES:
            return {
                ...state,
                tryTiles: []
            }
        case DEAL_PLAYER_TILES:
            key = ( action.payload.player === 1 ? 'p1Tiles' : 'p2Tiles' )
            const tileIds = action.payload.tiles.map( t => t._id )

            return {
                ...state,
                playerTiles: state.playerTiles.concat(action.payload.tiles),
                [key]: state[key].concat(tileIds)
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
        case CLEAR_GAME:
            return initialState
        default:
            return state
    }
}