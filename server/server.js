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

    socket.on('send move', (data) => {
        console.log('in send move')
        console.log(data)
        console.log(io.sockets.adapter.rooms)
        // socket.emit('successful move', data.game)
        // io.sockets.in(data.room).emit('successful move', data.game)

        socket.to(data.room).emit('successful move', data.game)
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})

