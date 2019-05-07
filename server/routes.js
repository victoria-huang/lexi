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

// user routes
router.route('/users').get(usersController.index)
router.route('/register').post(usersController.new)
router.route('/login').post(usersController.login)

router.route('/users/:user_id')
    .get(usersController.view)
    .patch(usersController.update)
    .put(usersController.update)
    .delete(usersController.delete)

// export API routes
module.exports = router