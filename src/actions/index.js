import * as types from '../constants/ActionTypes'

import axios from 'axios'
import jwt_decode from 'jwt-decode'

import setAuthToken from '../utils/setAuthToken'

/************ ERROR ************/

export const addErrors = error => ({
    type: types.ADD_ERRORS,
    payload: error
})

export const clearErrors = () => ({
    type: types.CLEAR_ERRORS
})

/************ CELL ************/

export const updateCells = cells => ({
    type: types.UPDATE_CELLS,
    payload: cells
})

export const setUsedCells = cellIds => dispatch => {
    // axios.patch(`/api/v1/games/${gameId}`, { cellIds })

    dispatch({
        type: types.SET_USED_CELLS,
        payload: cellIds
    })
}

/************ TILE ************/

export const selectTile = tile => ({
    type: types.SELECT_TILE,
    payload: tile
})

export const deselectTile = () => ({
    type: types.DESELECT_TILE
})

export const addToHand = (tile, player) => ({
    type: types.ADD_TO_HAND,
    payload: {
        tile,
        player 
    }
})

export const removeFromHand = (tile, player) => ({
    type: types.REMOVE_FROM_HAND,
    payload: {
        tile,
        player
    }
})

export const addTryTile = tile => ({
    type: types.ADD_TRY_TILE,
    payload: tile
})

export const removeTryTile = tile => ({
    type: types.REMOVE_TRY_TILE,
    payload: tile
})

export const clearTryTiles = () => ({
    type: types.CLEAR_TRY_TILES
})

export const dealPlayerTiles = (tiles, player) => ({
    type: types.DEAL_PLAYER_TILES,
    payload: {
        tiles,
        player
    }
})

export const shufflePlayerTiles = (tiles, player) => ({
    type: types.SHUFFLE_PLAYER_TILES,
    payload: {
        tiles,
        player 
    }
})

export const updateUnusedTiles = tiles => ({
    type: types.UPDATE_UNUSED_TILES,
    payload: tiles
})

export const updateUsedTiles = tiles => ({
    type: types.UPDATE_USED_TILES,
    payload: tiles
})

/************ GAME ************/

export const startGame = () => ({
    type: types.START_GAME
})

export const endGame = () => ({
    type: types.END_GAME
})

export const addPoints = points => ({
    type: types.ADD_POINTS,
    payload: points
})

export const setExchanged = () => ({
    type: types.SET_EXCHANGED
})

export const resetExchanged = () => ({
    type: types.RESET_EXCHANGED
})

export const switchTurn = () => ({
    type: types.SWITCH_TURN
})

export const dealFirstHand = () => ({
    type: types.DEAL_FIRST_HAND
})

export const setPlayers = (playerOne, playerTwo) => dispatch => {
    axios.post('/api/v1/games', {
        playerOne: playerOne.userId,
        playerTwo: playerTwo.userId,
        p1Name: playerOne.name,
        p2Name: playerTwo.name
    }).then(res => {
        const game = res.data.game
        
        dispatch(updateCells(game.cells.allCells))
        dispatch(updateUnusedTiles(game.tiles.unusedTiles))

        dispatch({
            type: types.SET_PLAYERS,
            payload: {
                playerOne, 
                playerTwo
            }
        })
    })
}

/************ USER ************/

export const login = (userData, history) => dispatch => {
    axios.post('/api/v1/login', userData)
    .then(res => {
        const { token } = res.data

        localStorage.setItem('token', token)
        setAuthToken(token)

        const decodedUser = jwt_decode(token)
        // localStorage.setItem('user_id', decodedUser.id)
        axios.get(`/api/v1/users/${decodedUser.id}`)
        .then(res => {
            dispatch(setCurrentUser(res.data.user))
            dispatch(clearErrors())

            history.push('/')
        })
    })
    .catch(err => {
        dispatch({
            type: types.ADD_ERRORS,
            payload: err.response.data
        })
    })

}

export const register = (userData, history) => dispatch => {
    axios.post('/api/v1/register', userData)
    .then(res => {
        history.push('/login', { newAccount: 'success! login below.' })
    })
    .catch(err => {
        dispatch({
            type: types.ADD_ERRORS,
            payload: err.response.data
        })
    })
}

export const logoutUser = history => dispatch => {
    localStorage.removeItem('token')
    // remove auth header for future requests
    setAuthToken(false)
    // set current user to null which will set isAuthenticated to false
    dispatch(setCurrentUser(null))

    history.push('/login')
}

export const setCurrentUser = user => ({
    type: types.SET_CURRENT_USER,
    payload: user
})  

export const setAllUsers = users => dispatch => {
    axios.get('/api/v1/users')
    .then(res => {
        dispatch({
            type: types.SET_ALL_USERS,
            payload: res.data.users
        })
    })
}

/************ ALL ************/

export const clearGame = () => ({
    type: types.CLEAR_GAME
})

