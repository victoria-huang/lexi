import v4 from 'uuid'

import {
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION
} from '../constants/ActionTypes'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            const newNot = { ...action.payload, id: v4() }
            return [...state, newNot]
        case REMOVE_NOTIFICATION:
            return state.filter(n => n.id !== action.payload)
        default:
            return state
    }
}