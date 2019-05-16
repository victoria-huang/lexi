import {
    SET_CURRENT_USER,
    SET_ALL_USERS
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
        default:
            return state
    }
}