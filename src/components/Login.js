import React, { useState } from 'react'

import { connect } from 'react-redux'
import { login } from '../actions'

const Login = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        login({ username, password })
    }

    return (
        <div className='wrapper flex center column'>
            <h1 className='app-header'>l e x i .</h1>
            <p>test the depth of your vocabulary</p>
            <form onSubmit={ handleSubmit }>
                <input 
                    type='text'
                    placeholder='username'
                    value={ username } 
                    onChange={ (e) => setUsername(e.target.value) }
                />
                <br />
                <input 
                    type='password'
                    placeholder='password'
                    value={ password } 
                    onChange={ (e) => setPassword(e.target.value) }
                />
                <br />
                <input type='submit' value='login' />
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user))
})

export default connect(null, mapDispatchToProps)(Login)