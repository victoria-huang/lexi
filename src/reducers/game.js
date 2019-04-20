import {
    ADD_POINTS,
    SET_EXCHANGED,
    RESET_EXCHANGED
} from '../constants/ActionTypes'

const initialState = {
    points: 0,
    exchanged: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_POINTS:
            return { 
                ...state,
                points: state.points + action.payload 
            }
        case SET_EXCHANGED:
            return {
                ...state,
                exchanged: true
            }
        case RESET_EXCHANGED: 
            return {
                ...state,
                exchanged: false
            }
        default:
            return state
    }
}