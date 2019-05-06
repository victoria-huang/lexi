let mongoose = require('mongoose')

// setup schema
let userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

// export User model 
let User = module.exports = mongoose.model('user', userSchema)

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit)
}