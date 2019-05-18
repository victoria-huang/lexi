import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { v4 } from 'uuid'

import withAuth from '../hocs/withAuth'
import { 
    logoutUser, 
    setPlayers, 
    setAllUsers, 
    resumeGame 
} from '../actions'

const Home = ({ 
    user, 
    allUsers,
    logoutUser, 
    history,
    setPlayers,
    setAllUsers,
    resumeGame
}) => {
    useEffect(() => {
        setAllUsers()
    }, [])

    const [search, setSearch] = useState('')

    const handleStartPractice = () => {
        setPlayers({
            name: user.name, 
            userId: user._id
        }, {
            name: 'practice',
            userId: user._id
        })
        history.push('/game')
    }

    const handleStartGame = (p2) => {
        setPlayers({
            name: user.name,
            userId: user._id
        }, {
            name: p2.name,
            userId: p2._id
        })
        history.push('/game')
    }

    const handleResumeGame = (gameId) => {
        resumeGame(gameId)
        history.push('/game')
    }

    const renderUsers = () => allUsers.map(u => {
        if (u._id !== user._id) {
            return <li key={ v4() }>
                { u.username }
                <button onClick={ () => handleStartGame(u) }>
                    start game
                </button>
            </li>
        } else {
            return null
        }
    })

    const renderCurrentGames = () => user.currentGames.map(game => {
        return <li key={ v4() }>
            you ({ game.points }) vs. { game.otherPlayer.playerName } ({ game.otherPlayer.points })
            <button onClick={ () => handleResumeGame(game.gameId) }>
                resume game
            </button>
        </li>
        // if (user._id === game.playerOne) {
        //     return <li key={ v4() }>
        //         you ({ game.p1Points }) vs. { game.p2Name } ({ game.p2Points })
        //         <button onClick={ () => handleResumeGame(game._id) }>
        //             resume game
        //         </button>
        //     </li>
        // } else {
        //     return <li key={ v4() }>
        //         you ({ game.p2Points }) vs. { game.p1Name } ({ game.p1Points })
        //         <button onClick={ () => handleResumeGame(game._id) }>
        //             resume game
        //         </button>
        //     </li>
        // }
    })
    console.log(user.currentGames)
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
        <h3>all users</h3>
        <ul>
            { renderUsers() }
        </ul>
        <hr />
        <h3>your current games</h3>
            { renderCurrentGames() }
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
    user: state.user.currUser,
    allUsers: state.user.allUsers
})

export default connect(
    mapStateToProps, 
    { logoutUser, setPlayers, setAllUsers, resumeGame }
)(withAuth(Home))