import {
    ADD_ERROR,
    CLEAR_ERRORS
} from '../constants/ActionTypes'

const initialState = []

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_ERROR:
            return state.concat(action.payload)
        case CLEAR_ERRORS:
            return []
        default:
            return state
    }
}