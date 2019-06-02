import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
// import { Link } from 'react-router-dom'
import v4 from 'uuid'

import withAuth from '../hocs/withAuth'

import { 
    acceptChallenge, 
    declineChallenge, 
    resumeGame, 
    removeNotification 
} from '../actions'
import { joinRoom, leaveRoom } from '../socket'

const Nav = ({ 
    user, 
    notification,
    acceptChallenge,
    declineChallenge,
    resumeGame,
    removeNotification,
    history 
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
            <img 
                src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' 
                alt='profile-pic'
                className='card-avatar'
                style={{ marginLeft: '1vh' }} 
            />
            <h1 style={{ marginLeft: '1vh' }}>welcome back, { user.name }.</h1>
        </div>
        { 
            !openNotification 
            && 
            <div 
                className='flex center not-header'
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenNotification(!openNotification)}
            >
                you have { notification.length } new notifications
            </div>
        }

        <CSSTransitionGroup transitionName="slidedown">
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
                    close notifications
                </div> 
                </>
            }
        </CSSTransitionGroup>
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
    removeNotification 
})(withAuth(withRouter(Nav)))