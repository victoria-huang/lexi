// import User model
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

// load input validation
const validateRegistration = require('../validation/register')
const validateLogin = require('../validation/login')

// index 
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) res.json({ status: 'error', message: err })
        
        res.json({
            status: 'success',
            message: 'users retrieved!',
            data: users
        })
    })
}

// show/view
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) res.json({ status: 'error', message: err })

        res.json({
            message: 'user details retrieved!',
            data: user
        });
    });
}

// create
exports.new = function (req, res) {
    const { errors, isValid } = validateRegistration(req.body)

    if (!isValid) res.status(400).json(errors)

    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) return res.status(400).json({ email: 'email already exists' })
    })
    .catch(err => console.log(err))

    User.findOne({ username: req.body.username })
    .then(user => {
        if (user) return res.status(400).json({ username: 'username already exists' })
    })
    .catch(err => console.log(err))

    const user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    // hash pw & save user & check for errors 
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return res.json(err)
            
            user.password = hash;
            user.save()
            .then(user => res.json({
                status: 'success',
                message: 'new user created!',
                data: user
            }))
            .catch(err => console.log(err)) 
        })
    })
}

// login 
exports.login = function (req, res) {
    const { errors, isValid } = validateLogin(req.body)

    if (!isValid) res.status(400).json(errors)

    const username = req.body.username
    const password = req.body.password

    // find user by username
    User.findOne({ username })
    .then(user => {
        if (!user) return res.status(404).json({ error: 'incorrect username or password' })   
        
        // check password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
            // user matched
            // create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                }
            // sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    }
                )
            } else {
                return res.status(400).json({ error: 'incorrect username or password' })
            }
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

// update 
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) res.json({ status: 'error', message: err })

        user.username = req.body.username ? req.body.username : user.username
        user.name = req.body.name ? req.body.name : user.name
        user.email = req.body.email ? req.body.email : user.email

        user.save(function (err) {
            if (err) res.json({ status: 'error', message: err })

            res.json({
                status: 'success',
                message: 'user updated!',
                data: user
            })
        })
    })
}

// delete
exports.delete = function (req, res) {
    User.deleteOne({ 
        _id: req.params.user_id 
    }, function (err, user) {
        if (err) res.json({ status: 'error', message: err })

        res.json({
            status: 'success',
            message: 'user deleted!',
            data: user
        })
    })
}