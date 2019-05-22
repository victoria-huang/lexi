import io from 'socket.io-client'

import { END_GAME } from './constants/ActionTypes'
import {
    setGame,
    addGameRequest,
    addNotification,
    challengeDeclined,
    challengeAccepted,
    switchUserTurn,
    addUserPoints
} from './actions'

const socket = io('localhost:8080', {transports: ['websocket']})

const configureSocket = dispatch => {
    socket.on('connect', () => {
        console.log('connected')
    })

    socket.on('successful move', game => {
        dispatch(setGame(game))
    })

    socket.on('end game', () => {
        dispatch({ type: END_GAME })
    })

    socket.on('game request', game => {
        dispatch(addGameRequest(game))
    })

    socket.on('new game notif', notif => {
        dispatch(addNotification(notif))
    })

    socket.on('decline game', notif => {
        dispatch(addNotification(notif))
        dispatch(challengeDeclined(notif.gameId))
    })

    socket.on('accept game', notif => {
        dispatch(addNotification(notif))
        dispatch(challengeAccepted(notif.gameId))
    })

    socket.on('move notif', notif => {
        dispatch(addNotification(notif))
        dispatch(switchUserTurn(notif.gameId, notif.currUserId))
    })

    socket.on('add points', data => {
        dispatch(addUserPoints(data.gameId, data.points))
    })

    socket.on('disconnect', () => console.log('disconnect'))
  
    return socket
}

export const joinRoom = id => 
    socket.emit('room', { room: id })

export const leaveRoom = id => 
    socket.emit('leave room', { room: id })

export const sendMove = (game, room) => 
    socket.emit('send move', { game, room })

export const sendEndGame = room => 
    socket.emit('send end game', { room })

export const sendGameRequest = (room, game) => 
    socket.emit('send game request', { room, game })

export const sendNewGameNotif = (room, notif) => 
    socket.emit('send new game notif', { room, notif })

export const sendDeclineGame = (room, notif) => 
    socket.emit('send decline game', { room, notif })

export const sendAcceptGame = (room, notif) =>
    socket.emit('send accept game', { room, notif })

export const sendMoveNotif = (room, notif) => 
    socket.emit('send move notif', { room, notif })

export const sendAddPoints = (room, gameId, points) =>
    socket.emit('send add points', { room, gameId, points })

export default configureSocket