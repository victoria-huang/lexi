import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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

    const handleAccept = (gameId, p1, p2, notId) => {
        removeNotification(notId)
        acceptChallenge(gameId, p1, p2)
        .then(() => {
            resumeGame(gameId)
            .then(history.push('/game'))
        })
    }

    const handleDecline = (gameId, p1, p2, notId) => {
        removeNotification(notId)
        declineChallenge(gameId, p1, p2)
    }

    const renderNotifications = () => 
        notification.map(n => {
            if (n.type === 'new game request') {
                return <div key={ v4() }>
                    { n.user.name } ({ n.user.username }) challenged you to a game
                    <button onClick={ () => handleAccept(n.gameId, n.user, user, n.id) }>
                        accept
                    </button>
                    <button onClick={ () => handleDecline(n.gameId, n.user, user, n.id) }>
                        decline
                    </button>       
                </div>
            }

            if (n.type === 'game request reply') {
                return <div 
                    key={ v4() }
                    onClick={ () => removeNotification(n.id) }
                >
                    { n.user.name } has { n.reply } your game request
                    { 
                        n.reply === 'accepted' 
                        &&
                        <div>
                            go to game
                        </div>
                    }
                </div>
            }

            if (n.type === 'your move') {
                return <div key={ v4() }>
                    your move with { n.user.name }   
                </div>
            }
        })
    
    return (
        <>
            <div 
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenNotification(!openNotification)}
            >
                you have { notification.length } new notifications
                { openNotification && <>{ renderNotifications() }</> }
            </div>
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