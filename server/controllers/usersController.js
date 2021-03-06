// import User model
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const secretOrKey = keys.secretOrKey || process.env.SECRET_KEY

// load input validation
const validateRegistration = require('../validation/register')
const validateLogin = require('../validation/login')

const currentUser = User.currentUser

// index 
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) return res.json({ status: 'error', message: err })
        
        res.json({
            status: 'success',
            message: 'users retrieved!',
            users: users
        })
    })
}

// show/view
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) return res.json({ status: 'error', message: err })

        res.json({
            message: 'user details retrieved!',
            user
        });
    });
}

// create
exports.new = function (req, res) {
    const { errors, isValid } = validateRegistration(req.body)

    if (!isValid) return res.status(400).json(errors)

    User.findOne({ email: req.body.email.toLowerCase() })
    .then(user => {
        if (user) return res.status(400).json({ email: 'email already exists' })

        User.findOne({ username: req.body.username.toLowerCase() })
        .then(user => {
            if (user) return res.status(400).json({ username: 'username already exists' })
            
            const newUser = new User({
                username: req.body.username.toLowerCase(),
                name: req.body.name.toLowerCase(),
                email: req.body.email.toLowerCase(),
                password: req.body.password
            })
        
            // hash pw & save user & check for errors 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) return res.json(err)
                    
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json({
                        status: 'success',
                        message: 'new user created!',
                        data: user
                    }))
                    .catch(err => res.json({ status: 'error', message: err }))
                })
            })
        })
        .catch(err => res.json({ status: 'error', message: err }))
    })
    .catch(err => res.json({ status: 'error', message: err }))
}

// login 
exports.login = function (req, res) {
    const { errors, isValid } = validateLogin(req.body)

    if (!isValid) return res.status(400).json(errors)

    const username = req.body.username.toLowerCase()
    const password = req.body.password

    // find user by username
    User.findOne({ username })
    .then(user => {
        if (!user) return res.status(404).json({ message: 'incorrect username or password' })   
        
        // check password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
            // user matched
            // create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username
                }
            // sign token
                jwt.sign(
                    payload,
                    secretOrKey,
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
                return res.status(400).json({ message: 'incorrect username or password' })
            }
        })
        .catch(err => res.json({ status: 'error', message: err }))
    })
    .catch(err => res.json({ status: 'error', message: err }))
}

// update 
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) return res.json({ status: 'error', message: err })

        if (currentUser(req).id !== req.params.user_id) 
            return res.status(401).send('unauthorized')

        user.username = req.body.username ? req.body.username : user.username
        user.name = req.body.name ? req.body.name : user.name
        user.email = req.body.email ? req.body.email : user.email

        user.save(function (err) {
            if (err) return res.json({ status: 'error', message: err })

            res.json({
                status: 'success',
                message: 'user updated!',
                data: user
            })
        })
    })
}

// accept challenge
exports.accept = function (req, res) {
    if (currentUser(req).id !== req.params.user_id) 
        return res.status(401).send('unauthorized')

    User.updateOne(
        { '_id': req.params.user_id, 'games.gameId': req.body.gameId },
        { 
            '$set': {
                'games.$.pendingAnswer': false
            }
        }, 
        function (err, numAffected) {
            if (err) return res.json({ status: 'error', message: err })

            User.updateOne(
                { '_id': req.body.p1, 'games.gameId': req.body.gameId },
                { 
                    '$set': {
                        'games.$.pendingRequest': false
                    }
                }, 
                function (err, numAffected) {
                    if (err) return res.json({ status: 'error', message: err })
        
                    return res.json({
                        status: 'success',
                        message: 'accepted challenge'
                    })
                }
            )
        }
    )
}

// decline challenge
exports.decline = function (req, res) {
    if (currentUser(req).id !== req.params.user_id) 
        return res.status(401).send('unauthorized')
    
    Game.updateOne(
        { '_id': req.body.gameId },
        {
            '$set': {
                'declined': true
            }
        },
        function (err, numAffected) {
            if (err) return res.json({ status: 'error', message: err })
        }
    )

    User.updateOne(
        { '_id': req.params.user_id, 'games.gameId': req.body.gameId },
        { 
            '$set': {
                'games.$.declined': true,
                'games.$.current': false
            }
        }, 
        function (err, numAffected) {
            if (err) return res.json({ status: 'error', message: err })
            
            User.updateOne(
                { '_id': req.body.p1, 'games.gameId': req.body.gameId },
                { 
                    '$set': {
                        'games.$.declined': true,
                        'games.$.current': false
                    }
                }, 
                function (err, numAffected) {
                    if (err) return res.json({ status: 'error', message: err })

                    return res.json({
                        status: 'success',
                        message: 'declined challenge'
                    })
                }
            )
        }
    )
}

// delete
exports.delete = function (req, res) {
    if (currentUser(req).id !== req.params.user_id) 
        return res.status(401).send('unauthorized')

    User.deleteOne({ 
        _id: req.params.user_id 
    }, function (err, user) {
        if (err) return res.json({ status: 'error', message: err })

        res.json({
            status: 'success',
            message: 'user deleted!',
            data: user
        })
    })
}