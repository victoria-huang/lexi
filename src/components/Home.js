import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { v4 } from 'uuid'

import withAuth from '../hocs/withAuth'
import { 
    logoutUser, 
    setPlayers, 
    setAllUsers, 
    resumeGame,
    acceptChallenge,
    declineChallenge 
} from '../actions'

const Home = ({ 
    user, 
    allUsers,
    logoutUser, 
    history,
    setPlayers,
    setAllUsers,
    resumeGame,
    acceptChallenge,
    declineChallenge
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

    const handleAccept = (gameId, p1, p2) => {
        acceptChallenge(gameId, p1, p2)
        .then(() => {
            handleResumeGame(gameId)
        })
    }

    const handleDecline = (gameId, p1, p2) => {
        declineChallenge(gameId, p1, p2)
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

    const renderCurrentGames = () => user.games.map(game => {
        if (game.current) {
            return <li key={ v4() }>
                you ({ game.points }) vs. { game.otherPlayer.playerName } ({ game.otherPlayer.points })
                {
                    game.pendingAnswer ?
                    <>
                    <button onClick={ () => handleAccept(game.gameId, game.otherPlayer.playerId, user._id) }>
                        accept challenge
                    </button>
                    <button onClick={ () => handleDecline(game.gameId, game.otherPlayer.playerId, user._id) }>
                        decline challenge
                    </button>
                    </>
                    :
                    <button onClick={ () => handleResumeGame(game.gameId) }>
                        { 
                            game.pendingRequest ?
                            'awaiting response'
                            :
                            <>
                            {
                                game.whoseTurn === user._id ?
                                'your move'
                                :
                                'their move'
                            }
                            </>
                        }
                    </button>
                }
            </li>
        } else return null 
    })
    
    const renderPastGames = () => user.games.slice(-5).reverse().map(game => {
        if (!game.current) {
            return <li key={ v4() }>
                you ({ game.points }) vs. { game.otherPlayer.playerName } ({ game.otherPlayer.points })
                {
                    !game.declined &&
                    <p>
                        {
                            game.points > game.otherPlayer.points ?
                            'you won'
                            :
                            'you lost'
                        }
                    </p>
                }
                {
                    game.declined
                    &&
                    <p>
                        { 
                            game.pendingAnswer ?
                            'you declined'
                            :
                            'they declined'
                        }  
                    </p>
                }
                <button onClick={ () => handleStartGame({
                    _id: game.otherPlayer.playerId,
                    name: game.otherPlayer.playerName
                }) }>
                    rechallenge
                </button>
            </li>
        } else return null 
    })
    console.log(user.games)
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
        <h3>current games</h3>
        <ul>
            { renderCurrentGames() }
        </ul>
        <hr />
        <h3>past games</h3>
        <ul>
            { renderPastGames() }
        </ul>
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
    { logoutUser, setPlayers, setAllUsers, resumeGame, acceptChallenge, declineChallenge }
)(withAuth(Home))