module.exports = socket => {
    console.log('connected')
    
    socket.on('room', data => socket.join(data.room))

    socket.on('leave room', data => socket.leave(data.room))

    socket.on('send move', data => {
        socket.to(data.room).emit('successful move', data.game)
    })
    
    socket.on('send end game', data => {
        socket.to(data.gameRoom).emit('end game')
    })

    socket.on('send user end game', data => {
        socket.to(data.userRoom).emit('user end game', data.gameRoom)
    })

    socket.on('send game request', data => {
        socket.to(data.room).emit('game request', data.game)
    })

    socket.on('send new game notif', data => {
        socket.to(data.room).emit('new game notif', data.notif)
    })

    socket.on('send decline game', data => {
        socket.to(data.room).emit('decline game', data.notif)
    })

    socket.on('send user decline game', data => {
        socket.to(data.room).emit('user decline game', data.room)
    })

    socket.on('send accept game', data => {
        socket.to(data.room).emit('accept game', data.notif)
    })

    socket.on('send move notif', data => {
        socket.to(data.room).emit('move notif', data.notif)
    })

    socket.on('send add points', data => {
        socket.to(data.room).emit('add points', data)
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
}