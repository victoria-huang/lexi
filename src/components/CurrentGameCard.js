import React from 'react'

import { connect } from 'react-redux'

const CurrentGameCard = ({ 
    user,
    points,
    otherPlayer,
    whoseTurn,
    gameId,
    handleResumeGame, 
}) => (
    <div 
        className={
            whoseTurn === user._id 
            ?
            'current-game your-move box-shadow'
            :
            'current-game their-move box-shadow'
        }
        onClick={ () => handleResumeGame(gameId) }
    >  
        <div className='flex card-details'>
            <div>
                <div className='whose-move'>
                    {
                        whoseTurn === user._id ?
                        'your move'
                        :
                        'their move'
                    }
                </div>
                <div className='current-card-avatar flex center' style={{ backgroundColor: '#ffcf8f', color: 'white', fontSize: '2.8em'}}>
                    { otherPlayer.playerName[0].toUpperCase() }
                </div>
                {/*<img 
                    src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' 
                    alt='profile-pic'
                    className='current-card-avatar' 
                />*/}
            </div>
            <div className='flex column' style={{ justifyContent: 'center' }}>
                <h3 style={{ margin: '0', marginBottom: '1vh' }}>{ otherPlayer.playerName }</h3>
                <span>{ points } vs { otherPlayer.points }</span>
            </div>
        </div>
    </div>

)   

const mapStateToProps = state => ({
    user: state.user.currUser
})

export default connect(mapStateToProps)(CurrentGameCard)