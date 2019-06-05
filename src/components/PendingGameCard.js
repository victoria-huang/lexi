import React from 'react'

import { connect } from 'react-redux'

const PendingGameCard = ({ 
    user,
    otherPlayer,
    gameId,
    handleAccept, 
    handleDecline
}) => (
    <div className='pending-game box-shadow'>  
        <div className='flex card-3-details'>
            <div className='flex' style={{ alignItems: 'center' }}>
                <div className='card-avatar flex center' style={{ backgroundColor: '#ffcf8f', color: 'white', fontSize: '2em'}}>
                    { otherPlayer.playerName[0].toUpperCase() }
                </div>
                {/* <img 
                    src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' 
                    alt='profile-pic'
                    className='card-avatar' 
                /> */}
            </div>
            <div className='flex column' style={{ justifyContent: 'center' }}>
                <h3 style={{ margin: '0', marginBottom: '1vh' }}>
                    { otherPlayer.playerName }
                </h3>
                <span>challenged you</span>
            </div>
            <div className='flex column' style={{ justifyContent: 'center' }}>
                <div 
                    className='flex center' 
                    style={{ margin: '1vh', cursor: 'pointer' }} 
                    onClick={ () => handleAccept(gameId, otherPlayer, user) }
                >
                    <span>&#10003;</span>
                </div>
                <div 
                    className='flex center' 
                    style={{ cursor: 'pointer' }}
                    onClick={ () => handleDecline(gameId, otherPlayer, user) }
                >
                    <span>&#120;</span>
                </div>
            </div>
        </div>
    </div>

)   

const mapStateToProps = (state) => ({
    user: state.user.currUser
})

export default connect(mapStateToProps)(PendingGameCard)