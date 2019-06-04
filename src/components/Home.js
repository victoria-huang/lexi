import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { v4 } from 'uuid'

import withAuth from '../hocs/withAuth'
import {  
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
import Footer from './Footer'
import CurrentGameCard from './CurrentGameCard'
import PendingRequestCard from './PendingRequestCard'
import PendingGameCard from './PendingGameCard'
import PastGameCard from './PastGameCard'

const Home = ({ 
    user, 
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
    
    const renderPastGames = () => getPastGames().slice(-10).reverse().map(game => 
        <PastGameCard key={ v4() } { ...game } handleStartGame={ handleStartGame } />
    )

    return (
        <>
        <Nav />   

        <br />
        <br />
        <div className='body-home' style={{ marginLeft: '8px', marginRight: '8px', marginBottom: '15vh'}}>
            {
                getCurrentGames().length < 1
                &&
                <>
                <h3>you have no current games!</h3>
                <p>create a game to get started.</p>
                </>
            }
            <div className='card-grid'>
                { renderCurrentGames() }
            </div>
            <br />

            { 
                getPendingGames().length > 0 
                &&
                <>
                <h3>pending games</h3>
                <div className='card-grid'>
                    { renderPendingGames() }
                </div>
                <br />
                </>
            }

            {
                getPendingRequests().length > 0
                &&
                <>
                <h3>pending requests</h3>
                <div className='card-grid'>
                    { renderPendingRequests() }
                </div>
                <br />
                </>
            }
            
            {
                getPastGames().length > 0
                &&
                <>
                <h3>past games</h3>
                <div className='card-grid'>
                    { renderPastGames() }
                </div>
                </>
            }
        </div>
        <Footer />
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user.currUser,
    notification: state.notification
})

export default connect(
    mapStateToProps, 
    { 
        setPlayers, 
        setAllUsers, 
        resumeGame, 
        acceptChallenge, 
        declineChallenge, 
        clearGame,
        removeNotification
    }
)(withAuth(Home))