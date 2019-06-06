const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const GamesSchema = require('./game').schema
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const secretOrKey = keys.secretOrKey || process.env.SECRET_KEY

// setup schema
const UsersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    games: [{
        gameId: {
            type: ObjectId,
            required: true
        },
        points: {
            type: Number,
            required: true
        },
        whoseTurn: {
            type: ObjectId,
            required: true
        },
        otherPlayer: {
            playerId: {
                type: ObjectId,
                required: true
            },
            playerName: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            points: {
                type: Number,
                required: true
            }
        },
        current: {
            type: Boolean, 
            default: true
        },
        pendingRequest: {
            type: Boolean,
            required: true
        },
        pendingAnswer: {
            type: Boolean,
            required: true
        },
        declined: {
            type: Boolean,
            default: false
        }
    }]
}, { timestamps: true })

// export User model 
module.exports = User = mongoose.model('user', UsersSchema)

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit)
}

module.exports.schema = UsersSchema

module.exports.currentUser = function (req) {
    const token = req.headers['authorization'].split(' ')[1] 

    return jwt.verify(token, secretOrKey, function(err, decoded) {
        return decoded
    })
}