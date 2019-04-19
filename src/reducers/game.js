import {
    ADD_POINTS
} from '../constants/ActionTypes'

const initialState = {
    points: 0
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_POINTS:
            return { points: state.points + action.payload }
        default:
            return state
    }
}