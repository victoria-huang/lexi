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

export const setCells = cells => ({
    type: types.SET_CELLS,
    payload: cells
})

export const updateCells = (gameId, cells) => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, {
        actionType: 'UPDATE_CELLS', 
        cells 
    }).then(res => console.log(res))
    
    dispatch(setCells(cells))
}

export const setUsedCells = (gameId, cellIds) => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'SET_USED_CELLS',
        cellIds 
    }).then(res => console.log(res))

    dispatch({
        type: types.SET_USED_CELLS,
        payload: cellIds
    })
}

/************ TILE ************/

export const setUnusedTiles = tiles => ({
    type: types.SET_UNUSED_TILES,
    payload: tiles
})

export const selectTile = (gameId, selected) => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'SELECT_TILE',
        selected 
    }).then(res => console.log(res))

    dispatch({
        type: types.SELECT_TILE,
        payload: selected
    })
}

export const deselectTile = gameId => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'DESELECT_TILE',
    }).then(res => console.log(res))

    dispatch({
        type: types.DESELECT_TILE
    })
}

export const addToHand = (gameId, tile, player) => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'ADD_TO_HAND',
        tile,
        player
    }).then(res => console.log(res))

    dispatch({
        type: types.ADD_TO_HAND,
        payload: {
            tile,
            player 
        }
    })
}

export const removeFromHand = (gameId, tile, player) => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'REMOVE_FROM_HAND',
        tile,
        player
    }).then(res => console.log(res))

    dispatch({
        type: types.REMOVE_FROM_HAND,
        payload: {
            tile,
            player
        }
    })
}

export const addTryTile = (gameId, tile) => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'ADD_TRY_TILE',
        tile
    }).then(res => console.log(res))

    dispatch({
        type: types.ADD_TRY_TILE,
        payload: tile
    })
}

export const removeTryTile = (gameId, tile) => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'REMOVE_TRY_TILE',
        tile
    }).then(res => console.log(res))

    dispatch({
        type: types.REMOVE_TRY_TILE,
        payload: tile
    })
}

export const clearTryTiles = gameId => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'CLEAR_TRY_TILES',
    }).then(res => console.log(res))

    dispatch({
        type: types.CLEAR_TRY_TILES
    })
}

export const dealPlayerTiles = (gameId, tiles, player) => dispatch => {
    return axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'DEAL_PLAYER_TILES',
        tiles,
        player
    }).then((res) => {
        console.log(res)
        dispatch({
            type: types.DEAL_PLAYER_TILES,
            payload: {
                tiles,
                player
            }
        }) 
    })   
}

export const shufflePlayerTiles = (gameId, tiles, player) => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'SHUFFLE_PLAYER_TILES',
        tiles,
        player
    }).then(res => console.log(res))

    dispatch({
        type: types.SHUFFLE_PLAYER_TILES,
        payload: {
            tiles,
            player 
        }
    })
}

export const updateUnusedTiles = (gameId, tiles) => dispatch => {
    dispatch(setUnusedTiles(tiles))

    return axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'UPDATE_UNUSED_TILES',
        tiles
    }).then(res => console.log(res))
}

export const updateUsedTiles = (gameId, tiles) => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'UPDATE_USED_TILES',
        tiles
    }).then(res => console.log(res))

    dispatch({
        type: types.UPDATE_USED_TILES,
        payload: tiles
    })
}

/************ GAME ************/

export const resumeGame = gameId => dispatch => {
    return axios.get(`/api/v1/games/${gameId}`)
    .then(res => {
        console.log(res)
        const game = res.data.game
        
        localStorage.setItem('gameId', game._id)

        dispatch({
            type: types.RESUME_GAME,
            payload: game
        })
    })
}

export const resetGameResume = () => ({
    type: types.RESET_GAME_RESUME
})

export const startGame = gameId => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'START_GAME'
    }).then(res => console.log(res))

    dispatch({
        type: types.START_GAME
    })
}

export const endGame = gameId => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'END_GAME'
    }).then(res => console.log(res))

    dispatch({
        type: types.END_GAME
    })
}

export const addPoints = (gameId, points) => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'ADD_POINTS',
        points
    }).then(res => console.log(res))

    dispatch({
        type: types.ADD_POINTS,
        payload: points
    })
}

export const setExchanged = gameId => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'SET_EXCHANGED'
    }).then(res => console.log(res))

    dispatch({
        type: types.SET_EXCHANGED
    })
}

export const resetExchanged = gameId => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'RESET_EXCHANGED'
    }).then(res => console.log(res))

    dispatch({
        type: types.RESET_EXCHANGED
    })
}

export const switchTurn = gameId => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'SWITCH_TURN'
    }).then(res => console.log(res))

    dispatch({
        type: types.SWITCH_TURN
    })
}

export const dealFirstHand = gameId => dispatch => {
    axios.patch(`/api/v1/games/${gameId}`, { 
        actionType: 'DEAL_FIRST_HAND'
    }).then(res => console.log(res))

    dispatch({
        type: types.DEAL_FIRST_HAND
    })
}

export const setPlayers = (playerOne, playerTwo) => dispatch => {
    return axios.post('/api/v1/games', {
        playerOne: playerOne.userId,
        playerTwo: playerTwo.userId,
        p1Name: playerOne.name,
        p2Name: playerTwo.name
    }).then(res => {
        console.log(res)
        const game = res.data.game
        
        localStorage.setItem('gameId', game._id)

        dispatch(setCells(game.cells.allCells))
        dispatch(setUnusedTiles(game.tiles.unusedTiles))

        dispatch({
            type: types.SET_PLAYERS,
            payload: {
                gameId: game._id,
                playerOne, 
                playerTwo
            }
        })
    })
}

/************ USER ************/

export const acceptChallenge = (gameId, p1, p2) => dispatch => {
    dispatch({
        type: types.ACCEPT_CHALLENGE,
        payload: gameId
    })

    return axios.patch(`/api/v1/users/${p2}/accept`, {
        gameId, 
        p1
    }).then(console.log)
}

export const declineChallenge = (gameId, p1, p2) => dispatch => {
    dispatch({
        type: types.DECLINE_CHALLENGE,
        payload: gameId
    })

    axios.patch(`/api/v1/users/${p2}/decline`, {
        gameId, 
        p1
    }).then(console.log)}

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
    localStorage.clear()
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

