import {
    ADD_POINTS,
    SET_EXCHANGED,
    RESET_EXCHANGED,
    LOGIN
} from '../constants/ActionTypes'

const initialState = {
    points: 0,
    exchanged: false,
    playerOne: null,
    playerTwo: null,
    whoseTurn: 1,
    gameOver: false
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
        case LOGIN:
            return {
                ...state,
                playerOne: action.payload.playerOne,
                playerTwo: action.payload.playerTwo
            }
        default:
            return state
    }
}