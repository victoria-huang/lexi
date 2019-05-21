import io from 'socket.io-client'
import { SET_GAME } from './constants/ActionTypes'

const socket = io('localhost:8080', {transports: ['websocket']})

const configureSocket = dispatch => {
    socket.on('connect', () => {
        console.log('connected')
    })

    socket.on('successful move', game => {
        console.log('in successful move')
        dispatch({ type: SET_GAME, payload: game })
    })

    socket.on('disconnect', () => console.log('disconnect'))
  
    return socket
}

export const joinRoom = (gameId) => 
    socket.emit('room', { room: gameId })

export const leaveRoom = (gameId) => 
    socket.emit('leave room', { room: gameId })

export const sendMoveToServer = (game, room) => {
    console.log('in client send move')
    console.log('game', game)
    console.log('room', room)
    socket.emit('send move', { game, room })
}

export default configureSocket