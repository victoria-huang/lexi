const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateLogin(data) {
    let errors = {}
    // convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    // checks
    if (Validator.isEmpty(data.username)) {
       errors.username = 'username is required'
    } 

    if (Validator.isEmpty(data.password)) {
        errors.password = 'password is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}