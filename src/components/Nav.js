import React, { useEffect, useState } from 'react'

import v4 from 'uuid'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'

import { 
    acceptChallenge, 
    declineChallenge, 
    resumeGame, 
    removeNotification,
    logoutUser 
} from '../actions'

import { joinRoom, leaveRoom } from '../socket'

import CreateGame from './CreateGame'

import withAuth from '../hocs/withAuth'

const Nav = ({ 
    user, 
    notification,
    acceptChallenge,
    declineChallenge,
    resumeGame,
    removeNotification,
    history,
    logoutUser 
}) => {
    useEffect(() => {
        joinRoom(user.email)
    }, [])

    useEffect(() => () => {
        leaveRoom(user.email)
    }, [])

    const [openNotification, setOpenNotification] = useState(false)

    const handleResumeGame = (gameId, notId) => {
        removeNotification(notId)

        resumeGame(gameId)
        .then(history.push('/game'))
    }

    const handleAccept = (gameId, p1, p2, notId) => {
        removeNotification(notId)

        acceptChallenge(gameId, p1, p2)
        .then(() => {
            handleResumeGame(gameId)
        })
    }

    const handleDecline = (gameId, p1, p2, notId) => {
        removeNotification(notId)
        declineChallenge(gameId, p1, p2)
    }

    const renderNotifications = () => 
        notification.map(n => {
            if (n.type === 'new game request') {
                return <div key={ v4() } className='flex column center notification box-shadow'>
                    { n.user.playerName } ({ n.user.username }) challenged you to a game
                    <div className='flex'>
                        <button onClick={ () => handleAccept(n.gameId, n.user, user, n.id) } style={{ width: '100%' }}>
                            accept
                        </button>
                        <button onClick={ () => handleDecline(n.gameId, n.user, user, n.id) } style={{ width: '100%' }}>
                            decline
                        </button>
                    </div>       
                </div>
            }

            if (n.type === 'game request reply') {
                return <div key={ v4() } className='flex column center notification box-shadow'>
                    { n.user.name } has { n.reply } your game request
                    { 
                        n.reply === 'accepted' 
                        ?
                        <button onClick={ () => handleResumeGame(n.gameId, n.id) }>
                            go to game
                        </button>
                        :
                        <button onClick={ () => removeNotification(n.id) }>
                            ok
                        </button>
                    }
                </div>
            }

            if (n.type === 'your move') {
                return <div key={ v4() } className='flex column center notification box-shadow'>
                    your move with { n.name } 
                    <button onClick={ () => handleResumeGame(n.gameId, n.id) }>
                        go to game
                    </button>  
                </div>
            }

            return null
        })
    
    return (
        <>
        <div className='flex greeting app-header' style={{ borderBottom: '1px solid white', alignItems: 'center' }}>
            <div className='card-avatar flex center' style={{ backgroundColor: '#ffcf8f', color: 'white', fontSize: '2em', marginLeft: '1vh', fontFamily: 'Raleway', letterSpacing: '0' }}>
                { user.name[0].toUpperCase() }
            </div>

            <div className='flex' style={{ justifyContent: 'space-between', width: '100%'}}>
                <h1 style={{ marginLeft: '1vh' }}>hello { user.name }.</h1>
                <div className='flex' style={{ alignItems: 'flex-start' }}>
                <button
                    onClick={ () => logoutUser(history) }
                    style={{ padding: '8px', marginTop: '8px', marginRight: '8px' }}
                >
                    logout
                </button>
                </div>
            </div>
        </div>
        { 
            !openNotification 
            && 
            <div 
                className='flex center not-header'
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenNotification(!openNotification)}
            >
                notifications&nbsp;
                {
                    notification.length > 0
                    &&
                    `( ${notification.length} )`
                } 
                &nbsp; &#9663;
            </div>
        }

        <CSSTransitionGroup 
            transitionName="slidedown"
            transitionEnterTimeout={ 300 }
            transitionLeaveTimeout={ 300 }
        >
            { 
                openNotification 
                && 
                <>
                <div className='flex column panel box-shadow'>
                    { renderNotifications() }
                </div>
                <div 
                    className='flex center not-header'
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpenNotification(!openNotification)}
                >
                    close &#9653;
                </div> 
                </>
            }
        </CSSTransitionGroup>

        <CreateGame />
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user.currUser,
    notification: state.notification
})

export default connect(mapStateToProps, { 
    acceptChallenge, 
    declineChallenge, 
    resumeGame, 
    removeNotification,
    logoutUser 
})(withAuth(withRouter(Nav)))