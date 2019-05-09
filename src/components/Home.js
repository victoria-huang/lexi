import React, { useState } from 'react'

import axios from 'axios'
import { connect } from 'react-redux'

import withAuth from '../hocs/withAuth'
import { logoutUser, setPlayers } from '../actions'

const Home = ({ 
    user, 
    logoutUser, 
    history,
    setPlayers
}) => {
    const [search, setSearch] = useState('')
    // axios.get('/api/v1/users').then(console.log)

    const handleStartPractice = () => {
        setPlayers(user.name, 'practice')
        history.push('/game')
    }

    return (
        <>
        <div className='flex column'>
            <h1 className='app-header'>hi { user.name }.</h1>
            <p>search for a user to start a game</p>
            
            <input 
                type='text'
                placeholder='type username or email here...'
                value={ search } 
                onChange={ (e) => setSearch(e.target.value) }
            />  
        </div>
        <hr />
        <button onClick={ handleStartPractice }>
            start practice game
        </button>

        <button onClick={ () => logoutUser(history) }>
            logout
        </button>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(
    mapStateToProps, 
    { logoutUser, setPlayers }
)(withAuth(Home))