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
    clearGame,
    removeNotification
} from '../actions'

import { joinRoom, leaveRoom } from '../socket'

import Nav from './Nav'
import CurrentGameCard from './CurrentGameCard'
import PendingRequestCard from './PendingRequestCard'
import PendingGameCard from './PendingGameCard'
import PastGameCard from './PastGameCard'

const Home = ({ 
    user, 
    allUsers,
    logoutUser, 
    history,
    setPlayers,
    setAllUsers,
    resumeGame,
    acceptChallenge,
    declineChallenge,
    notification,
    removeNotification,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0)

        clearGame()
        localStorage.removeItem('gameId')
        setAllUsers()
        joinRoom(user.email)
    }, [])

    useEffect(() => () => {
        leaveRoom(user.email)
    }, [])

    // const [search, setSearch] = useState('')

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

    const removeMoveNotification = (gameId) => {
        const notType1 = 'game request reply'
        const notType2 = 'your move'

        const foundNot = notification.find(n =>
           n.gameId === gameId && (n.type === notType1 || n.type === notType2)
        )

        if (foundNot) removeNotification(foundNot.id)
    }

    const removeRequestNotification = (gameId) => {
        const notType = "new game request"

        const foundNot = notification.find(n => 
            n.type === notType && n.gameId === gameId
        )
        if (foundNot) removeNotification(foundNot.id)
    }

    const handleResumeGame = (gameId) => {
        removeMoveNotification(gameId)

        resumeGame(gameId)
        .then(() => history.push('/game'))
    }

    const handleAccept = (gameId, p1, p2) => {
        removeRequestNotification(gameId)

        acceptChallenge(gameId, p1, p2)
        .then(() => {
            handleResumeGame(gameId)
        })
    }

    const handleDecline = (gameId, p1, p2) => {
        removeRequestNotification(gameId)

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
        <CurrentGameCard key={ v4() } { ...game } handleResumeGame={ handleResumeGame } />
    )
    
    const renderPendingRequests = () => getPendingRequests().map(game =>
        <PendingRequestCard key={ v4() } { ...game } handleResumeGame={ handleResumeGame } />
    )

    const renderPendingGames = () => getPendingGames().map(game =>
        <PendingGameCard key={ v4() } { ...game } handleAccept={ handleAccept } handleDecline={ handleDecline } />
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
    
    const renderPastGames = () => getPastGames().slice(-5).reverse().map(game => 
        <PastGameCard key={ v4() } { ...game } handleStartGame={ handleStartGame } />
    )

    return (
        <>
        <Nav />
        <div className='flex column center app-header box-shadow'>
            <h1>welcome back, { user.name }.</h1>
            {/*<p>search for a user to start a game</p>
            
            <input 
                type='text'
                placeholder='type username or email here...'
                value={ search } 
                onChange={ (e) => setSearch(e.target.value) }
            />*/} 
        </div>
        <br />
        <br />
        <div className='card-grid'>
            { renderCurrentGames() }
        </div>
        <br />
        <h3>pending games</h3>
        <div className='card-grid'>
            { renderPendingGames() }
        </div>
        <br />
        <h3>pending requests</h3>
        <div className='card-grid'>
            { renderPendingRequests() }
        </div>
        <br />
        <h3>past games</h3>
        <div className='card-grid'>
            { renderPastGames() }
        </div>
        <hr />
        <h3>all users</h3>
        <ul>
            { renderUsers() }
        </ul>
        
        <button onClick={ () => logoutUser(history) }>
            logout
        </button>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user.currUser,
    allUsers: state.user.allUsers,
    notification: state.notification
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
        clearGame,
        removeNotification
    }
)(withAuth(Home))