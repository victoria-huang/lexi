const mongoose = require('mongoose')

// setup schema
const UsersSchema = mongoose.Schema({
    user_name: {
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
    hash: String,
    salt: String,
    create_date: {
        type: Date,
        default: Date.now
    }
})

UsersSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
};
  
UsersSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
};

UsersSchema.methods.generateJWT = function () {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)

    return jwt.sign({
        user_name: this.user_name,
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, 'secret')
}

UsersSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        user_name: this.user_name,
        token: this.generateJWT()
    }
}

// export User model 
const User = module.exports = mongoose.model('user', UsersSchema)

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit)
}