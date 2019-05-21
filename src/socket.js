import io from 'socket.io-client'
import { 
    SET_GAME, 
    END_GAME, 
    ADD_GAME_REQUEST 
} from './constants/ActionTypes'

const socket = io('localhost:8080', {transports: ['websocket']})

const configureSocket = dispatch => {
    socket.on('connect', () => {
        console.log('connected')
    })

    socket.on('successful move', game => {
        dispatch({ type: SET_GAME, payload: game })
    })

    socket.on('end game', () => {
        dispatch({ type: END_GAME })
    })

    socket.on('game request', game => {
        console.log(game)
        dispatch({ type: ADD_GAME_REQUEST, payload: game })
    })

    socket.on('disconnect', () => console.log('disconnect'))
  
    return socket
}

export const joinRoom = id => 
    socket.emit('room', { room: id })

export const leaveRoom = id => 
    socket.emit('leave room', { room: id })

export const sendMove = (game, room) => {
    socket.emit('send move', { game, room })
}

export const sendEndGame = room => {
    socket.emit('send end game', { room })
}

export const sendGameRequest = (room, game) => {
    socket.emit('send game request', { room, game })
}

export default configureSocket