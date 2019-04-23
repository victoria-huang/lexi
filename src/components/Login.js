import React, { useState } from 'react'

import { connect } from 'react-redux'
import { login } from '../actions'

const Login = (props) => {
    const [playerOne, setPlayerOne] = useState('')
    const [playerTwo, setPlayerTwo] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        props.login(playerOne, playerTwo)
    }

    return (
        <form onSubmit={ handleSubmit }>
            <label>Player One</label>
            <input 
                type='text'
                value={ playerOne } 
                onChange={ (e) => setPlayerOne(e.target.value) }
            />
            <br />
            <label>Player Two</label>
            <input 
                type='text'
                value={ playerTwo } 
                onChange={ (e) => setPlayerTwo(e.target.value) }
            />
            <br />
            <input type='submit' />
        </form>
    )
}

const mapDispatchToProps = (dispatch) => ({
    login: (pOne, pTwo) => dispatch(login(pOne, pTwo))
})

export default connect(null, mapDispatchToProps)(Login)