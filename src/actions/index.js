import * as types from '../constants/ActionTypes'

export const addError = (error) => {
    return {
        type: types.ADD_ERROR,
        payload: error
    }
}

export const clearErrors = () => {
    return {
        type: types.CLEAR_ERRORS
    }
}