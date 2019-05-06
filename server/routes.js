// initialize express router
let router = require('express').Router()

// set default API response
router.get('/', function (req, res) {
    res.json({
       status: 'success',
       message: 'Welcome to the Lexi API!',
    })
})

// import user controller 
let userController = require('./controller/userController')

// user routes
router.route('/users')
    .get(userController.index)
    .post(userController.new)

router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete)

// export API routes
module.exports = router