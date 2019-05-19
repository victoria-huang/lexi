import {
    SET_CURRENT_USER,
    SET_ALL_USERS,
    ACCEPT_CHALLENGE,
    DECLINE_CHALLENGE
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
        default:
            return state
    }
}