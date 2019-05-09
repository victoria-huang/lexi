import React, { useState } from 'react'

import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { register } from '../actions'

const Register = ({ register, history }) => {
    if (localStorage.getItem('token')) history.push('/')

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        register({ 
            name,
            username, 
            email,
            password,
            password2
        }, history)
    }

    return (
        <div className='wrapper flex center column'>
            <h1 className='app-header'>l e x i .</h1>
            <p className='p-register'>test the depth of your vocabulary</p>
            <p>create your account</p>
            <form onSubmit={ handleSubmit }>
                <input 
                    type='text'
                    placeholder='name'
                    value={ name } 
                    onChange={ (e) => setName(e.target.value) }
                />
                <br />
                <input 
                    type='text'
                    placeholder='username'
                    value={ username } 
                    onChange={ (e) => setUsername(e.target.value) }
                />
                <br />
                <input 
                    type='text'
                    placeholder='email'
                    value={ email } 
                    onChange={ (e) => setEmail(e.target.value) }
                />
                <br />
                <input
                    data-tip="password" 
                    type='password'
                    placeholder='password'
                    value={ password } 
                    onChange={ (e) => setPassword(e.target.value) }
                />
                <ReactTooltip   
                    place='right'
                    type='light' 
                    effect='solid'
                >
                    <span className='tooltip'>
                        must be between 6 and 30 characters
                    </span>
                </ReactTooltip>
                <br />
                <input 
                    type='password'
                    placeholder='confirm password'
                    value={ password2 } 
                    onChange={ (e) => setPassword2(e.target.value) }
                />
                <br />

                <div className='flex center'>
                    <input 
                        type='submit' 
                        className='submit-auth'
                        value='register' 
                    />
                </div>
          
                <div className='register flex center column'>
                    <span>already registered?</span>
                    <span>
                        click <Link to='/' className='register-link'>
                            here
                        </Link> to login
                    </span>
                </div>
            </form>
        </div>
    )
}

export default connect(null, { register })(Register)