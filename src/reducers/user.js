import {
    SET_CURRENT_USER,
    SET_ALL_USERS,
    ACCEPT_CHALLENGE,
    DECLINE_CHALLENGE,
    ADD_GAME_REQUEST,
    CHALLENGE_ACCEPTED,
    SWITCH_USER_TURN,
    ADD_USER_POINTS
} from '../constants/ActionTypes'

const initialState = {
    currUser: null,
    allUsers: []
}

export default (state = initialState, action) => {
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
            const acceptGames = state.currUser.games.map(game => {
                if (game.gameId === action.payload) {
                    return { ...game, pendingAnswer: false }
                } else return game
            })

            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games: acceptGames
                }
            }
        case CHALLENGE_ACCEPTED:
            const acceptedGames = state.currUser.games.map(game => {
                if (game.gameId === action.payload) {
                    return { ...game, pendingRequest: false }
                } else return game
            })

            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games: acceptedGames
                }
            }
        case DECLINE_CHALLENGE:
            const declineGames = state.currUser.games.map(game => {
                if (game.gameId === action.payload) {
                    return { ...game, declined: true, current: false }
                } else return game
            })

            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games: declineGames
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
            const newGames = state.currUser.games.map(game => {
                if (game.gameId === action.payload.gameId) {
                    return { ...game, whoseTurn: action.payload.userId }
                } else return game 
            })

            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games: newGames
                }
            }
        case ADD_USER_POINTS:
            const pointGames = state.currUser.games.map(game => {
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
            console.log(pointGames)
            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    games: pointGames
                }
            }
        default:
            return state
    }
}