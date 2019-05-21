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
    declineChallenge, 
    clearGame
} from '../actions'

import { joinRoom, leaveRoom } from '../socket'

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
        clearGame()
        localStorage.removeItem('gameId')
        setAllUsers()
        joinRoom(user.email)
    }, [])

    useEffect(() => () => {
        leaveRoom(user.email)
    }, [])

    const [search, setSearch] = useState('')

    // const handleStartPractice = () => {
    //     setPlayers({
    //         name: user.name, 
    //         userId: user._id
    //     }, {
    //         name: 'practice',
    //         userId: user._id
    //     })
    //     history.push('/game')
    // }

    const handleStartGame = (p2) => {
        setPlayers({
            name: user.name,
            userId: user._id,
            username: user.username,
            email: user.email
        }, {
            name: p2.name,
            userId: p2._id,
            username: p2.username,
            email: p2.email
        })
        .then(() => history.push('/game'))
    }

    const handleResumeGame = (gameId) => {
        resumeGame(gameId)
        .then(() => history.push('/game'))
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

    const getCurrentGames = () => user.games.filter(game => game.current && !game.pendingRequest && !game.pendingAnswer)

    const getPendingRequests = () => user.games.filter(game => game.current && game.pendingRequest)

    const getPendingGames = () => user.games.filter(game => game.current && game.pendingAnswer)

    const getPastGames = () => user.games.filter(game => !game.current)

    const renderCurrentGames = () => getCurrentGames().map(game => 
        <li key={ v4() }>
            you ({ game.points }) vs. { game.otherPlayer.playerName } ({ game.otherPlayer.points })
            <button onClick={ () => handleResumeGame(game.gameId) }>
                {
                    game.whoseTurn === user._id ?
                    'your move'
                    :
                    'their move'
                }
            </button>
        </li>
    )
    
    const renderPendingRequests = () => getPendingRequests().map(game =>
        <li key={ v4() }>
            you vs. { game.otherPlayer.playerName }
            <button onClick={ () => handleResumeGame(game.gameId) }>
                awaiting response
            </button>
        </li>
    )

    const renderPendingGames = () => getPendingGames().map(game =>
        <li key={ v4() }>
            you vs. { game.otherPlayer.playerName }
            <button onClick={ () => handleAccept(game.gameId, game.otherPlayer, user) }>
                accept challenge
            </button>
            <button onClick={ () => handleDecline(game.gameId, game.otherPlayer, user) }>
                decline challenge
            </button>
        </li>
    )

    // const renderCurrentGames = () => user.games.map(game => {
    //     if (game.current) {
    //         return <li key={ v4() }>
    //             you ({ game.points }) vs. { game.otherPlayer.playerName } ({ game.otherPlayer.points })
    //             {
    //                 game.pendingAnswer ?
    //                 <>
    //                 <button onClick={ () => handleAccept(game.gameId, game.otherPlayer.playerId, user._id) }>
    //                     accept challenge
    //                 </button>
    //                 <button onClick={ () => handleDecline(game.gameId, game.otherPlayer.playerId, user._id) }>
    //                     decline challenge
    //                 </button>
    //                 </>
    //                 :
    //                 <button onClick={ () => handleResumeGame(game.gameId) }>
    //                     { 
    //                         game.pendingRequest ?
    //                         'awaiting response'
    //                         :
    //                         <>
    //                         {
    //                             game.whoseTurn === user._id ?
    //                             'your move'
    //                             :
    //                             'their move'
    //                         }
    //                         </>
    //                     }
    //                 </button>
    //             }
    //         </li>
    //     } else return null 
    // })
    
    const renderPastGames = () => getPastGames().slice(-5).reverse().map(game => {
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
                name: game.otherPlayer.playerName,
                _id: game.otherPlayer.playerId,
                username: game.otherPlayer.username,
                email: game.otherPlayer.email
            }) }>
                rechallenge
            </button>
        </li>
    })

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
        <h3>pending games</h3>
        <ul>
            { renderPendingGames() }
        </ul>
        <hr />
        <h3>pending requests</h3>
        <ul>
            { renderPendingRequests() }
        </ul>
        <hr />
        <h3>past games</h3>
        <ul>
            { renderPastGames() }
        </ul>
        <hr />
        {/*<button onClick={ handleStartPractice }>
            start practice game
        </button>*/}

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
    { 
        logoutUser, 
        setPlayers, 
        setAllUsers, 
        resumeGame, 
        acceptChallenge, 
        declineChallenge, 
        clearGame
    }
)(withAuth(Home))