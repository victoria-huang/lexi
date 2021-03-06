import {
    SET_GAME,
    START_GAME,
    END_GAME,
    CLEAR_GAME,
    ADD_POINTS,
    SET_EXCHANGED,
    RESET_EXCHANGED,
    SWITCH_TURN,
    DEAL_FIRST_HAND,
    RESET_GAME_RESUME,
    DECLINE_GAME
} from '../constants/ActionTypes'

const initialState = {
    gameId: null,
    playerOne: null,
    playerTwo: null,
    p1Points: 0,
    p2Points: 0,
    exchanged: false,
    whoseTurn: 1,
    gameOver: false,
    gameStart: false,
    declined: false,
    firstHandDealt: false,
    gameResume: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_GAME:
            const { 
                _id, 
                playerOne, 
                playerTwo, 
                p1Name,
                p2Name,
                p1Points, 
                p2Points, 
                exchanged, 
                whoseTurn,
                gameOver,
                gameStart,
                declined,
                firstHandDealt,
                gameResume
            } = action.payload

            const resGameBoolean = gameResume ? gameResume : false

            return {
                gameId: _id,
                playerOne: {
                    userId: playerOne,
                    name: p1Name
                },
                playerTwo: {
                    userId: playerTwo,
                    name: p2Name
                },
                p1Points, 
                p2Points, 
                exchanged, 
                whoseTurn,
                gameOver,
                gameStart,
                declined,
                firstHandDealt,
                gameResume: resGameBoolean
            }
        case RESET_GAME_RESUME:
            return {
                ...state,
                gameResume: false
            }
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
        case SWITCH_TURN:
            const playerTurn = ( state.whoseTurn === 1 ? 2 : 1 )

            return {
                ...state,
                whoseTurn: playerTurn
            }
        case DEAL_FIRST_HAND:
            return {
                ...state,
                firstHandDealt: true
            }
        case DECLINE_GAME:
            return {
                ...state,
                declined: true
            }
        default:
            return state
    }
}