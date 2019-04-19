import { ALL_CELLS } from '../constants'
import {
    UPDATE_CELLS,
    SET_USED_CELLS
} from '../constants/ActionTypes'

const initialState = {
    allCells: ALL_CELLS,
    usedCells: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_CELLS:
            return {
                ...state,
                allCells: action.payload
            }
        case SET_USED_CELLS:
            return {
                ...state,
                usedCells: state.usedCells.concat(action.payload)
            }
        default:
            return state
    }
}