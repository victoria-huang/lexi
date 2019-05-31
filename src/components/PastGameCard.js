import React from 'react'

const PastGameCard = ({ 
    points,
    otherPlayer,
    declined,
    pendingAnswer,
    handleStartGame
}) => (
    <div className='past-game'>  
        <div className='flex card-3-details'>
            <div className='flex' style={{ alignItems: 'center' }}>
                <img 
                    src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' 
                    alt='profile-pic'
                    className='card-avatar' 
                />
            </div>
            <div className='flex column' style={{ justifyContent: 'center' }}>
                <h3 style={{ margin: '0', marginBottom: '1vh' }}>{ otherPlayer.playerName }</h3>
                {
                    !declined &&
                    <>
                    <span>
                        {
                            points > otherPlayer.points ?
                            'you won'
                            :
                            'you lost'
                        }
                    </span>
                    <span>{ points } vs { otherPlayer.points }</span>
                    </>
                }
                {
                    declined
                    &&
                    <span>
                        { 
                            pendingAnswer ?
                            'you declined'
                            :
                            'they declined'
                        }  
                    </span>
                }
            </div>
            <div className='flex column' style={{ justifyContent: 'center' }}>
                <button onClick={ () => handleStartGame({
                    name: otherPlayer.playerName,
                    _id: otherPlayer.playerId,
                    username: otherPlayer.username,
                    email: otherPlayer.email
                }) }>
                    rechallenge
                </button>
            </div>
        </div>
    </div>

)   

export default PastGameCard