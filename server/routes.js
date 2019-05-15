// initialize express router
const router = require('express').Router()

// set default API response
router.get('/', function (req, res) {
    res.json({
       status: 'success',
       message: 'Welcome to the Lexi API!',
    })
})

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

// import user controller 
const usersController = require('./controllers/usersController')

// user routes
router.route('/users').get(withAuth, usersController.index)
router.route('/register').post(usersController.new)
router.route('/login').post(usersController.login)

router.route('/users/:user_id')
    .all(withAuth)
    .get(usersController.view)
    .patch(usersController.update)
    .put(usersController.update)
    .delete(usersController.delete)

// import game controller
const gamesController = require('./controllers/gamesController')

// game routes
router.route('/games')
    .get(gamesController.index)
    .post(withAuth, gamesController.new)

router.route('/games/:game_id')
    .get(withAuth, gamesController.view)
    .patch(withAuth, gamesController.update)
    .put(withAuth, gamesController.update)

// export API routes
module.exports = router