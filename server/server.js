const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// auth
const session = require('express-session')

const routes = require("./routes")

// initialize the app
const app = express()

// configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// connect to mongoose and set connection variable
mongoose.connect('mongodb://localhost/lexi')

const db = mongoose.connection

// setup server port
const port = process.env.PORT || 8080

// send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'))

// use api routes in the app
app.use('/api/v1', routes)

// launch app to listen to specified port
app.listen(port, function () {
    console.log("App listening on port " + port);
})