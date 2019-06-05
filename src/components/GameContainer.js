import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import { resumeGame } from '../actions'

import { joinRoom, leaveRoom } from '../socket'

import Board from './Board'
import TileContainer from './TileContainer'
import ErrorContainer from './ErrorContainer'
import ControlPanel from './ControlPanel'
import GameOver from './GameOver'
import Declined from './Declined'

import withAuth from '../hocs/withAuth'


const GameContainer = ({
    p1Points,
    p2Points,
    whoseTurn,
    playerOne,
    playerTwo,
    gameOver,
    declined,
    resumeGame,
    gameId,
    history
}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
        
        if (gameId) joinRoom(gameId)

        const persistGameId = localStorage.getItem('gameId')

        // load game on page refresh
        if (persistGameId && !gameId) {
            resumeGame(persistGameId)
            joinRoom(persistGameId)
        }
        // go back to home page if no game stored
        if (!persistGameId) history.push('/')
    }, [])

    useEffect(() => () => {
        leaveRoom(gameId)
    }, [])

    return (
        <div className='container slide-in-left'>
            { 
                gameId
                ?
                <>
                <div className='top-wrapper flex'>
                    <span className='flex center'>
                        <div className='game-avatar flex center' style={{ backgroundColor: '#ffcf8f', color: 'white', fontSize: '1.2em', fontFamily: 'Raleway', letterSpacing: '0' }}>
                            { playerOne.name[0].toUpperCase() }
                        </div>
                        {/* <img 
                            src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' 
                            alt='profile-pic'
                            className='game-avatar' 
                        /> */}
                        <h1 className={ whoseTurn === 1 ? 'turn game-header' : 'game-header'}>
                            { playerOne.name.split(' ')[0] }: { p1Points }
                        </h1>
                    </span>

                    <h1 
                        onClick={ () => history.push('/') }
                        style={{ cursor: 'pointer' }}
                        className='game-header'
                    >
                        l e x i .
                    </h1>

                    <span className='flex center'>
                        <h1 className={ whoseTurn === 2 ? 'turn game-header' : 'game-header'}>
                            { playerTwo.name.split(' ')[0] }: { p2Points }
                        </h1>
                        <div className='game-avatar flex center' style={{ backgroundColor: '#ffcf8f', color: 'white', fontSize: '1em', fontFamily: 'Raleway', letterSpacing: '0' }}>
                            { playerTwo.name[0].toUpperCase() }
                        </div>
                        {/* <img 
                            src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' 
                            alt='profile-pic'
                            className='game-avatar' 
                        /> */}
                    </span>
                </div>
                
                <ErrorContainer />
                <Board />
                <TileContainer />
                <ControlPanel />
                </>
                :
                <div>loading...</div>
            }

            { gameOver && <GameOver /> }

            { declined && <Declined />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    p1Points: state.game.p1Points,
    p2Points: state.game.p2Points,
    whoseTurn: state.game.whoseTurn,
    playerOne: state.game.playerOne,
    playerTwo: state.game.playerTwo,
    gameOver: state.game.gameOver,
    declined: state.game.declined,
    gameId: state.game.gameId
})

export default connect(
    mapStateToProps, 
    { resumeGame }
)(withAuth(GameContainer))