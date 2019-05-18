const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const GamesSchema = require('./game').schema
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const secretOrKey = keys.secretOrKey

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
    currentGames: [{
        gameId: {
            type: ObjectId,
            required: true
        },
        points: {
            type: Number,
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
            points: {
                type: Number,
                required: true
            }
        }
    }],
    pendingGames: [{
        gameId: {
            type: ObjectId,
            required: true
        },
        points: {
            type: Number,
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
            points: {
                type: Number,
                required: true
            }
        }
    }],
    wonGames: [{
        gameId: {
            type: ObjectId,
            required: true
        },
        points: {
            type: Number,
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
            points: {
                type: Number,
                required: true
            }
        }
    }],
    lostGames: [{
        gameId: {
            type: ObjectId,
            required: true
        },
        points: {
            type: Number,
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
            points: {
                type: Number,
                required: true
            }
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