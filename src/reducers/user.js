import {
    SET_CURRENT_USER,
    SET_ALL_USERS,
    ACCEPT_CHALLENGE,
    DECLINE_CHALLENGE,
    ADD_GAME_REQUEST,
    CHALLENGE_ACCEPTED,
    SWITCH_USER_TURN,
    ADD_USER_POINTS,
    USER_END_GAME
} from '../constants/ActionTypes'

const initialState = {
    currUser: null,
    allUsers: []
}

export default (state = initialState, action) => {
    let games 
    
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currUser: action.payload
            }
        case SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }
        case ACCEPT_CHALLENGE:
            games = state.currUser.games.map(game => {
                if (game.gameId === action.payload) {
                    return { ...game, pendingAnswer: false }
                } else return game
            })

            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games
                }
            }
        case CHALLENGE_ACCEPTED:
            games = state.currUser.games.map(game => {
                if (game.gameId === action.payload) {
                    return { ...game, pendingRequest: false }
                } else return game
            })

            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games
                }
            }
        case DECLINE_CHALLENGE:
            games = state.currUser.games.map(game => {
                if (game.gameId === action.payload) {
                    return { ...game, declined: true, current: false }
                } else return game
            })

            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games
                }
            }
        case ADD_GAME_REQUEST:
            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games: state.currUser.games.concat(action.payload)
                }
            }
        case SWITCH_USER_TURN:
            games = state.currUser.games.map(game => {
                if (game.gameId === action.payload.gameId) {
                    return { ...game, whoseTurn: action.payload.userId }
                } else return game 
            })

            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games
                }
            }
        case ADD_USER_POINTS:
            games = state.currUser.games.map(game => {
                if (game.gameId === action.payload.gameId) {
                    return { 
                        ...game,
                        otherPlayer: {
                            ...game.otherPlayer,
                            points: game.otherPlayer.points + action.payload.points
                        } 
                    }
                } else return game 
            })

            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games
                }
            }
        case USER_END_GAME:
            games = state.currUser.games.map(game => {
                if (game.gameId === action.payload) {
                    return { ...game, current: false }
                } else return game 
            }) 

            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games
                }
            }
        default:
            return state
    }
}