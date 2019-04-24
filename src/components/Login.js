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
        <>
        <div className='wrapper'>
            <h1 className='app-header'>l e x i .</h1>
            <p>test the depth of your vocabulary</p>
            <form onSubmit={ handleSubmit }>
                <input 
                    type='text'
                    placeholder='player one'
                    value={ playerOne } 
                    onChange={ (e) => setPlayerOne(e.target.value) }
                />
                <br />
                <input 
                    type='text'
                    placeholder='player two'
                    value={ playerTwo } 
                    onChange={ (e) => setPlayerTwo(e.target.value) }
                />
                <br />
                <input type='submit' value='start game' />
            </form>
        </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
    login: (pOne, pTwo) => dispatch(login(pOne, pTwo))
})

export default connect(null, mapDispatchToProps)(Login)