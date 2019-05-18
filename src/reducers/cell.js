// import { ALL_CELLS } from '../constants'
import {
    RESUME_GAME,
    SET_CELLS,
    // UPDATE_CELLS,
    SET_USED_CELLS,
    CLEAR_GAME
} from '../constants/ActionTypes'

const initialState = {
    allCells: [],
    usedCells: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case RESUME_GAME:
            const usedCellIds = action.payload.cells.usedCells.map(cell => cell._id)
            return {
                allCells: action.payload.cells.allCells,
                usedCells: usedCellIds
            }
        case SET_CELLS:
            return {
                ...state,
                allCells: action.payload
            }
        // case UPDATE_CELLS:
        //     return {
        //         ...state,
        //         allCells: action.payload
        //     }
        case SET_USED_CELLS:
            return {
                ...state,
                usedCells: state.usedCells.concat(action.payload)
            }
        case CLEAR_GAME:
            return initialState
        default:
            return state
    }
}