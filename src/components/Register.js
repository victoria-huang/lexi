import React, { useState, useEffect } from 'react'

import v4 from 'uuid'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { register, clearErrors } from '../actions'

import Error from './Error'

const Register = ({ errors, register, history, clearErrors }) => {
    useEffect(() => {
        clearErrors()
    }, [])

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        clearErrors()
        register({ 
            name,
            username, 
            email,
            password,
            password2
        }, history)
    }

    const renderErrors = () => errors.map(e => <Error key={ v4()} message={ e } /> )

    return (
        <>
        <p className='fade-in'>create your account</p>
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
                    placeholder='name'
                    value={ name } 
                    onChange={ (e) => setName(e.target.value) }
                />
                <div className="line"></div>
            </div>

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
                    type='text'
                    placeholder='email'
                    value={ email } 
                    onChange={ (e) => setEmail(e.target.value) }
                />
                <div className="line"></div>
            </div>

            <div className='form-input'>
                <input 
                    required
                    data-tip
                    data-for='password'
                    type='password'
                    placeholder='password'
                    value={ password } 
                    onChange={ (e) => setPassword(e.target.value) }
                />
                <ReactTooltip 
                    id='password'  
                    place='right'
                    type='light' 
                    effect='solid'
                >
                    <span className='tooltip'>
                        must be between 6 and 30 characters
                    </span>
                </ReactTooltip>
                <div className="line"></div>
            </div>
            
            <div className='form-input'>
                <input 
                    required
                    type='password'
                    placeholder='confirm password'
                    value={ password2 } 
                    onChange={ (e) => setPassword2(e.target.value) }
                />
                <div className="line"></div>
            </div>

            <button className='flex center'>
                <input 
                    type='submit' 
                    className='submit-auth'
                    value='register' 
                />
            </button>
        
            <div className='register flex center column'>
                <span>already registered?</span>
                <span>
                    click <Link to='/login' className='register-link'>
                        here
                    </Link> to login
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
    register,
    clearErrors
})(Register)