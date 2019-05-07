const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegistration(data) {
    let errors = {}
    // convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : ''
    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    // checks
    if (Validator.isEmpty(data.username)) {
        errors.username = 'username is required'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'name is required'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'email is required'
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'email is invalid'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'password is required'
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'confirm password is required'
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'password must be at least 6 characters'
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "passwords must match"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
