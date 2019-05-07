// import User model
const User = require('../models/user')

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
    const user = new User()
    user.user_name = req.body.user_name
    user.name = req.body.name
    user.email  = req.body.email

    // save user & check for errors 
    user.save(function (err) { 
        if (err) res.json({ status: 'error', message: err })

        res.json({
            status: 'success',
            message: 'new user created!',
            data: user
        })
    })
}

// update 
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) res.json({ status: 'error', message: err })

        user.user_name = req.body.user_name ? req.body.user_name : user.user_name
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