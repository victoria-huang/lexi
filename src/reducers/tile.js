import { ALL_TILES } from '../constants'

const initialState = {
    unusedTiles: ALL_TILES,
    tryTiles: [],
    playerTiles: [],
    usedTiles: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
}