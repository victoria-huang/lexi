const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
require('./config/passport')(passport)
const cors = require('cors')
const routes = require("./routes")

// initialize the app
const app = express()

// configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

// passport middleware
app.use(passport.initialize())

// connect to mongoose and set connection variable
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/lexi', { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)

const db = mongoose.connection

// setup server port
const port = process.env.PORT || 8080

// send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'))

// use api routes in the app
app.use('/api/v1', routes)

// launch app to listen to specified port
const server = app.listen(port, function () {
    console.log("App listening on port " + port);
})

const io = socketIo.listen(server)

io.on('connection', socket => {
    console.log('connected')
    
    socket.on('room', data => socket.join(data.room))

    socket.on('leave room', data => socket.leave(data.room))

    socket.on('send move', data => {
        socket.to(data.room).emit('successful move', data.game)
    })
    
    socket.on('send end game', data => {
        socket.to(data.room).emit('end game', null)
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

    // send decline game
    // send accept game
    // notification system
    // friend requests?
    // chat?

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})

