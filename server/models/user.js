const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    create_date: {
        type: Date,
        default: Date.now
    }
})

// export User model 
module.exports = User = mongoose.model('user', UsersSchema)

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit)
}