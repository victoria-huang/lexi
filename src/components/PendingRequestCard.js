import React from 'react'

const PendingRequestCard = ({ 
    otherPlayer,
    gameId,
    handleResumeGame, 
}) => (
    <div 
        className='current-game pending-request box-shadow'
        onClick={ () => handleResumeGame(gameId) }
    >  
        <div className='flex card-details'>
            <div className='flex' style={{ alignItems: 'center' }}>
                <img 
                    src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' 
                    alt='profile-pic'
                    className='card-avatar' 
                />
            </div>
            <div className='flex column' style={{ justifyContent: 'center' }}>
                <h3 style={{ margin: '0', marginBottom: '1vh' }}>{ otherPlayer.playerName }</h3>
                <span>awaiting response</span>
            </div>
        </div>
    </div>

)   

export default PendingRequestCard