import React, { useState, useEffect } from 'react'

import v4 from 'uuid'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { login, clearErrors } from '../actions'

import Error from './Error'

const Login = ({ errors, login, history, clearErrors }) => {
    useEffect(() => {
        clearErrors()
    }, [])
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        clearErrors()
        login({ username, password }, history)
    }

    const renderErrors = () => errors.map(e => <Error key={ v4()} message={ e } /> )
    
    return (
        <>
        { 
            (history.location.state && history.location.state.newAccount) 
            && 
            <div className='success-message flex center'>
                <span>{ history.location.state.newAccount }</span>
            </div>
        }
        { 
            errors.length > 0 
            &&
            <div className='error-message-login flex column center'>
                { renderErrors() }
            </div>
        }
        <form onSubmit={ handleSubmit } className='fade-in'>
            <div className='form-input'>
                <input 
                    required
                    type='text'
                    placeholder='username'
                    value={ username } 
                    onChange={ (e) => setUsername(e.target.value) }
                />
                <div className="line"></div>
            </div>
            
            <div className='form-input'>
                <input 
                    required
                    type='password'
                    placeholder='password'
                    value={ password } 
                    onChange={ (e) => setPassword(e.target.value) }
                />
                <div className="line"></div>
            </div>

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

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { 
    login, 
    clearErrors 
})(Login)