import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../actions'

const Login = ({ login, history }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        login({ username, password }, history)
    }

    return (
        <>
        { 
            (history.location.state && history.location.state.newAccount) 
            && 
            <div className='success-message flex center'>
                <span>{ history.location.state.newAccount }</span>
            </div>
        }
        <form onSubmit={ handleSubmit } className='fade-in'>
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

            <div className='flex center'>
                <input 
                    type='submit' 
                    className='submit-auth'
                    value='login' 
                />
            </div>
    
            <div className='register flex center'>
                <span>
                    click <Link to='/login/register' className='register-link'>
                        here
                    </Link> to sign up
                </span>
            </div>
        </form>
        </>
    )
}

export default connect(null, { login })(Login)