import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import Board from './Board'
import TileContainer from './TileContainer'
import ErrorContainer from './ErrorContainer'
import ControlPanel from './ControlPanel'
import GameOver from './GameOver'
import withAuth from '../hocs/withAuth'
import { resumeGame } from '../actions'
import { joinRoom, leaveRoom } from '../socket'

const GameContainer = ({
    p1Points,
    p2Points,
    whoseTurn,
    playerOne,
    playerTwo,
    gameOver,
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
        <div className='container'>
            { 
                gameId
                ?
                <>
                <div className='top-wrapper flex'>
                    <h1 className={ whoseTurn === 1 ? 'turn game-header' : 'game-header'}>
                        { playerOne.name }: { p1Points }
                    </h1>

                    <h1 
                        onClick={ () => history.push('/') }
                        style={{ cursor: 'pointer' }}
                        className='game-header'
                    >
                        l e x i .
                    </h1>

                    <h1 className={ whoseTurn === 2 ? 'turn game-header' : 'game-header'}>
                        { playerTwo.name }: { p2Points }
                    </h1>
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
    gameId: state.game.gameId
})

export default connect(mapStateToProps, { resumeGame })(withAuth(GameContainer))