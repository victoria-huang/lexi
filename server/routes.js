// initialize express router
const router = require('express').Router()

// set default API response
router.get('/', function (req, res) {
    res.json({
       status: 'success',
       message: 'Welcome to the Lexi API!',
    })
})

// import user controller 
const usersController = require('./controllers/usersController')

// with auth check
const secretOrKey = require('./config/keys').secretOrKey
const jwt = require('jsonwebtoken')

const withAuth = (req, res, next) => {
    const bearerToken = req.headers['authorization']
    let token

    if (bearerToken) {
        token = bearerToken.split(' ')[1]
    }
    
    if (!token) {
        res.status(401).send('unauthorized')
    } else {
        jwt.verify(token, secretOrKey, function (err, decoded) {
            if (err) {
                res.status(401).send('unauthorized')
            } else {
                // if user no longer exists but token is valid
                User.findById(decoded.id, function (err, user) {
                    if (err) return res.json({ status: 'error', message: err })

                    if (!user) return res.status(404).send('user not found')

                    next()
                })
            }
        })
    }
}

// user routes
router.route('/users').get(usersController.index)
router.route('/register').post(usersController.new)
router.route('/login').post(usersController.login)

router.route('/users/:user_id')
    .get(withAuth, usersController.view)
    .patch(withAuth, usersController.update)
    .put(withAuth, usersController.update)
    .delete(withAuth, usersController.delete)

// export API routes
module.exports = router