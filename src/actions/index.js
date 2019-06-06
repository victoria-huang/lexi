import * as types from '../constants/ActionTypes'
import { LEXI_API } from '../constants'

import axios from 'axios'
import jwt_decode from 'jwt-decode'

import setAuthToken from '../utils/setAuthToken'

import {
    sendMove,
    sendEndGame,
    sendGameRequest,
    sendNewGameNotif,
    sendDeclineGame,
    sendUserDeclineGame,
    sendAcceptGame,
    sendMoveNotif,
    sendAddPoints
} from '../socket'

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
    dispatch(setCells(cells))
    
    return axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, {
        actionType: 'UPDATE_CELLS', 
        cells 
    })
    // .then(res => console.log(res))
}

export const setUsedCells = (gameId, cellIds) => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'SET_USED_CELLS',
        cellIds 
    })
    // .then(res => console.log(res))

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
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'SELECT_TILE',
        selected 
    })
    // .then(res => console.log(res))

    dispatch({
        type: types.SELECT_TILE,
        payload: selected
    })
}

export const deselectTile = gameId => dispatch => {
    dispatch({
        type: types.DESELECT_TILE
    })

    return axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'DESELECT_TILE',
    })
    // .then(res => console.log(res))
}

export const addToHand = (gameId, tile, player) => dispatch => {
    dispatch({
        type: types.ADD_TO_HAND,
        payload: {
            tile,
            player 
        }
    })

    return axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'ADD_TO_HAND',
        tile,
        player
    })
    // .then(res => console.log(res))
}

export const removeFromHand = (gameId, tile, player) => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'REMOVE_FROM_HAND',
        tile,
        player
    })
    // .then(res => console.log(res))

    dispatch({
        type: types.REMOVE_FROM_HAND,
        payload: {
            tile,
            player
        }
    })
}

export const addTryTile = (gameId, tile) => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'ADD_TRY_TILE',
        tile
    })
    // .then(res => console.log(res))

    dispatch({
        type: types.ADD_TRY_TILE,
        payload: tile
    })
}

export const removeTryTile = (gameId, tile) => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'REMOVE_TRY_TILE',
        tile
    })
    // .then(res => console.log(res))

    dispatch({
        type: types.REMOVE_TRY_TILE,
        payload: tile
    })
}

export const clearTryTiles = gameId => dispatch => {
    dispatch({
        type: types.CLEAR_TRY_TILES
    })

    return axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'CLEAR_TRY_TILES',
    })
    // .then(res => console.log(res))
}

export const dealPlayerTiles = (gameId, tiles, player) => dispatch => {
    return axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'DEAL_PLAYER_TILES',
        tiles,
        player
    }).then((res) => {
        // console.log(res)
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
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'SHUFFLE_PLAYER_TILES',
        tiles,
        player
    })
    // .then(res => console.log(res))

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

    return axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'UPDATE_UNUSED_TILES',
        tiles
    })
    // .then(res => console.log(res))
}

export const updateUsedTiles = (gameId, tiles) => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'UPDATE_USED_TILES',
        tiles
    })
    // .then(res => console.log(res))

    dispatch({
        type: types.UPDATE_USED_TILES,
        payload: tiles
    })
}

/************ GAME ************/

export const resumeGame = gameId => dispatch => {
    return axios.get(`${LEXI_API}/api/v1/games/${gameId}`)
    .then(res => {
        // console.log(res)
        const game = res.data.game

        localStorage.setItem('gameId', game._id)

        dispatch(setGame({ ...game, gameResume: true}))
    })
}

export const setGame = (game) => ({
    type: types.SET_GAME,
    payload: game
})

export const resetGameResume = () => ({
    type: types.RESET_GAME_RESUME
})

export const startGame = gameId => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'START_GAME'
    })
    // .then(res => console.log(res))

    dispatch({
        type: types.START_GAME
    })
}

export const endGame = (gameId, userId) => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'END_GAME'
    }).then(res => {
        // console.log(res)
        const game = res.data.game

        dispatch({
            type: types.END_GAME
        })

        let userRoom = game.playerOne === userId ? game.p2Email : game.p1Email

        sendEndGame(gameId, userRoom)
    })
}

export const addPoints = (gameId, points, userId) => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'ADD_POINTS',
        points
    }).then(res => {
        // console.log(res)
        const game = res.data.game

        let room = game.playerOne === userId ? game.p2Email : game.p1Email
        sendAddPoints(room, gameId, points)
    }) 

    dispatch({
        type: types.ADD_POINTS,
        payload: points
    })
}

export const setExchanged = gameId => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'SET_EXCHANGED'
    })
    // .then(res => console.log(res))

    dispatch({
        type: types.SET_EXCHANGED
    })
}

export const resetExchanged = gameId => dispatch => {
    dispatch({
        type: types.RESET_EXCHANGED
    })

    return axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'RESET_EXCHANGED'
    })
    // .then(res => console.log(res))
}

export const switchTurn = gameId => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'SWITCH_TURN'
    }).then(res => {
        const game = res.data.game

        dispatch({
            type: types.SWITCH_TURN
        })
        
        const room = game.whoseTurn === 1 ? game.p1Email : game.p2Email
        const name = game.whoseTurn === 1 ? game.p2Name : game.p1Name
        const currUserId = game.whoseTurn === 1 ? game.playerOne : game.playerTwo

        const notif = {
            type: 'your move',
            gameId,
            name,
            currUserId
        }

        sendMove(res.data.game, gameId)
        sendMoveNotif(room, notif)
    })
}

export const dealFirstHand = gameId => dispatch => {
    axios.patch(`${LEXI_API}/api/v1/games/${gameId}`, { 
        actionType: 'DEAL_FIRST_HAND'
    })
    // .then(res => console.log(res))

    dispatch({
        type: types.DEAL_FIRST_HAND
    })
}

export const setPlayers = (playerOne, playerTwo) => dispatch => {
    return axios.post(`${LEXI_API}/api/v1/games`, {
        playerOne: playerOne.userId,
        playerTwo: playerTwo.userId,
        p1Name: playerOne.name,
        p1Username: playerOne.username,
        p1Email: playerOne.email,
        p2Name: playerTwo.name,
        p2Username: playerTwo.username,
        p2Email: playerTwo.email
    }).then(res => {
        // console.log(res)
        const game = res.data.game
        
        localStorage.setItem('gameId', game._id)

        dispatch(setGame(game))
        
        const requestGame = {
            gameId: game._id,
            points: game.p2Points,
            whoseTurn: game.playerOne,
            otherPlayer: {
                playerId: game.playerOne,
                playerName: game.p1Name,
                username: playerOne.username,
                email: playerOne.email,
                points: game.p1Points,
            },
            current: true,
            pendingRequest: false,
            pendingAnswer: true,
            declined: false
        }

        const notif = {
            type: 'new game request',
            gameId: game._id,
            user: {
                playerId: game.playerOne,
                playerName: game.p1Name,
                username: playerOne.username,
                email: playerOne.email,
                points: game.p1Points
            }
        }

        sendGameRequest(playerTwo.email, requestGame)
        sendNewGameNotif(playerTwo.email, notif)
    })
}

/************ USER ************/

export const userEndGame = gameId => ({
    type: types.USER_END_GAME,
    payload: gameId
})

export const acceptChallenge = (gameId, p1, p2) => dispatch => {
    dispatch({
        type: types.ACCEPT_CHALLENGE,
        payload: gameId
    })

    const notif = {
        type: 'game request reply',
        gameId,
        user: p2,
        reply: 'accepted'
    }

    sendAcceptGame(p1.email, notif)

    return axios.patch(`${LEXI_API}/api/v1/users/${p2._id}/accept`, {
        gameId, 
        p1: p1.playerId
    })
    // .then(console.log)
}

export const challengeAccepted = gameId => ({
    type: types.CHALLENGE_ACCEPTED,
    payload: gameId
})

export const declineChallenge = (gameId, p1, p2) => dispatch => {
    dispatch({
        type: types.DECLINE_CHALLENGE,
        payload: gameId
    })

    const notif = {
        type: 'game request reply',
        gameId,
        user: p2,
        reply: 'declined'
    }

    sendDeclineGame(p1.email, notif)
    sendUserDeclineGame(gameId)

    axios.patch(`${LEXI_API}/api/v1/users/${p2._id}/decline`, {
        gameId, 
        p1: p1.playerId
    })
    // .then(console.log)
}

export const challengeDeclined = gameId => dispatch => {
    dispatch({
        type: types.DECLINE_CHALLENGE,
        payload: gameId
    })
}

export const switchUserTurn = (gameId, userId) => ({
    type: types.SWITCH_USER_TURN,
    payload: {
        gameId,
        userId
    }
})

export const addUserPoints = (gameId, points) => ({
    type: types.ADD_USER_POINTS,
    payload: {
        gameId,
        points
    }
})

export const declineGame = gameId => ({
    type: types.DECLINE_GAME,
    payload: gameId
})

export const login = (userData, history) => dispatch => {
    axios.post(`${LEXI_API}/api/v1/login`, userData)
    .then(res => {
        const { token } = res.data

        localStorage.setItem('token', token)
        setAuthToken(token)

        const decodedUser = jwt_decode(token)

        axios.get(`${LEXI_API}/api/v1/users/${decodedUser.id}`)
        .then(res => {
            dispatch(setCurrentUser(res.data.user))
            dispatch(clearErrors())

            history.push('/')
        })
    })
    .catch(err => {
        for (const key in err.response.data) {
            dispatch({
                type: types.ADD_ERRORS,
                payload: err.response.data[key]
            })
        } 
    })
}

export const register = (userData, history) => dispatch => {
    axios.post(`${LEXI_API}/api/v1/register`, userData)
    .then(res => {
        history.push('/login', { newAccount: 'success! login below.' })
    })
    .catch(err => {
        for (const key in err.response.data) {
            dispatch({
                type: types.ADD_ERRORS,
                payload: err.response.data[key]
            })
        } 
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
    axios.get(`${LEXI_API}/api/v1/users`)
    .then(res => {
        dispatch({
            type: types.SET_ALL_USERS,
            payload: res.data.users
        })
    })
}

export const addGameRequest = game => ({ 
    type: types.ADD_GAME_REQUEST, 
    payload: game 
})

/************ NOTIFICATION ************/

export const addNotification = notif => ({
    type: types.ADD_NOTIFICATION,
    payload: notif  
})

export const removeNotification = notId => ({
    type: types.REMOVE_NOTIFICATION,
    payload: notId
})

/************ ALL ************/

export const clearGame = () => ({
    type: types.CLEAR_GAME
})

