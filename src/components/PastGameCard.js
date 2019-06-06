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
            <div 
                className='flex' 
                style={{ alignItems: 'center' }}
            >
                <div className='card-avatar flex center' style={{ backgroundColor: '#ffcf8f', color: 'white', fontSize: '2em'}}>
                    { otherPlayer.playerName[0].toUpperCase() }
                </div>
            </div>
            <div 
                className='flex column' 
                style={{ 
                    justifyContent: 'center', 
                    borderBottom: '1px solid #ccc' 
                }}
            >
                <h3 style={{ margin: '0', marginBottom: '1vh' }}>
                    { otherPlayer.playerName }
                </h3>
                {
                    !declined &&
                    <>
                    <span>
                        {
                            points > otherPlayer.points ?
                            'you won'
                            :
                            <>
                            {
                                points === otherPlayer.points ?
                                'you tied'
                                :
                                'you lost'
                            }
                            </>
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
            <div 
                className='flex column' 
                style={{ 
                    justifyContent: 'center', 
                    borderBottom: '1px solid #ccc' 
                }}
            >
                <div 
                    className='flex center' 
                    style={{ cursor: 'pointer' }} 
                    onClick={ () => handleStartGame({
                        name: otherPlayer.playerName,
                        _id: otherPlayer.playerId,
                        username: otherPlayer.username,
                        email: otherPlayer.email
                    }) }
                >
                    <span>&#10227;</span>
                </div>
            </div>
        </div>
    </div>

)   

export default PastGameCard