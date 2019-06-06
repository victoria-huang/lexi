import React, { useEffect, useRef } from 'react'

import { connect } from 'react-redux'

import {
    updateUnusedTiles,
    dealPlayerTiles,
    endGame,
    dealFirstHand,
    resetGameResume,
} from '../actions'

import Submit from './Submit'
import Shuffle from './Shuffle'
import Exchange from './Exchange'
import TileBag from './TileBag'
import EndGame from './EndGame'
import Pass from './Pass'

const ControlPanel = ({ 
    unusedTiles, 
    dealPlayerTiles, 
    updateUnusedTiles, 
    endGame,  
    selected, 
    exchanged,
    firstHandDealt,
    dealFirstHand,
    whoseTurn,
    playerOne,
    playerTwo,
    user,
    gameId,
    gameResume,
    resetGameResume
})  => {
    const firstHand = useRef(false)

    useEffect(() => {
        createHand(7, 1)
    }, [])

    useEffect(() => {
        if (firstHand.current) createHand(7, 2)
        else firstHand.current = true
        
    }, [firstHandDealt])

    const createHand = (num, player) => {
        if (gameResume) {
            resetGameResume()
            return 
        }

        if (unusedTiles.length >= num) {
            let playerTiles = []
            let copyUnusedTiles = [...unusedTiles]
    
            for (let i = 0; i < num; i++) {
                const max = copyUnusedTiles.length - 1
                const min = 0
                const randomIndex = Math.floor(Math.random() * (max - min) + min)
                const foundTile = copyUnusedTiles[randomIndex]
                playerTiles.push(foundTile)
                copyUnusedTiles = copyUnusedTiles.filter(t => t !== foundTile)
            }

            return updateUnusedTiles(gameId, copyUnusedTiles)
            .then(() => {
                dealPlayerTiles(gameId, playerTiles, player)
                .then(() => {
                    if (!firstHandDealt) dealFirstHand(gameId)
                })
            })
        } else endGame(gameId)
    }

    let player = user._id === playerOne.userId ? 1 : 2
    
    return (
        <div className='flex center'>
            { 
                (whoseTurn === player || playerOne.userId === playerTwo.userId)
                ?
                <>
                <Submit createHand={ createHand } />
                <Shuffle />
                { (selected && !exchanged) && <Exchange /> }
                <TileBag />
                <Pass />
                <EndGame />
                </>
                :
                <div>waiting for their move...</div>
            }
        </div>
    ) 
}

const mapStateToProps = (state) => ({
    gameId: state.game.gameId,
    unusedTiles: state.tile.unusedTiles,
    selected: state.tile.selected,
    exchanged: state.game.exchanged,
    firstHandDealt: state.game.firstHandDealt,
    whoseTurn: state.game.whoseTurn,
    playerOne: state.game.playerOne,
    playerTwo: state.game.playerTwo,
    user: state.user.currUser,
    gameResume: state.game.gameResume,
})

export default connect(mapStateToProps, {
    dealPlayerTiles,
    updateUnusedTiles,
    endGame,
    dealFirstHand,
    resetGameResume
})(ControlPanel)