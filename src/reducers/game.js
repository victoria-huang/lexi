import {
    START_GAME,
    END_GAME,
    CLEAR_GAME,
    ADD_POINTS,
    SET_EXCHANGED,
    RESET_EXCHANGED,
    SET_PLAYERS,
    SWITCH_TURN,
    DEAL_FIRST_HAND
} from '../constants/ActionTypes'

const initialState = {
    p1Points: 0,
    p2Points: 0,
    exchanged: false,
    playerOne: null,
    playerTwo: null,
    whoseTurn: 1,
    gameOver: false,
    gameStart: false,
    firstHandDealt: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case START_GAME:
            return {
                ...state,
                gameStart: true
            }
        case END_GAME:
            return {
                ...state,
                gameOver: true
            }
        case CLEAR_GAME:
            return initialState
        case ADD_POINTS:
            const key = ( state.whoseTurn === 1 ? "p1Points" : "p2Points" )

            return { 
                ...state,
                [key]: state[key] + action.payload 
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
        case SET_PLAYERS:
            return {
                ...state,
                playerOne: action.payload.playerOne,
                playerTwo: action.payload.playerTwo
            }
        case SWITCH_TURN:
            const whoseTurn = ( state.whoseTurn === 1 ? 2 : 1 )

            return {
                ...state,
                whoseTurn
            }
        case DEAL_FIRST_HAND:
            return {
                ...state,
                firstHandDealt: true
            }
        default:
            return state
    }
}