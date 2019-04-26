import {
    ADD_ERRORS,
    CLEAR_ERRORS,
    CLEAR_GAME
} from '../constants/ActionTypes'

const initialState = []

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_ERRORS:
            return state.concat(action.payload)
        case CLEAR_ERRORS:
            return []
        case CLEAR_GAME:
            return initialState
        default:
            return state
    }
}