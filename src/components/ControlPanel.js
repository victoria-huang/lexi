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

    // const handlePass = () => {
    //     const copyCells = cells.map(cell => {
    //         if (tryTiles.find(tile => tile._id === cell.tileId)) {
    //             return { ...cell, tileId: null, value: null, points: null }
    //         } else return cell
    //     })

    //     const tryTilePromises = tryTiles.map(tile => addToHand(gameId, tile, whoseTurn))
        
    //     updateCells(gameId, copyCells)
    //     .then(() => {
    //         Promise.all(tryTilePromises)
    //         .then(() => {
    //             Promise.all([resetExchanged(gameId), deselectTile(gameId), clearTryTiles(gameId)])
    //             .then(() => switchTurn(gameId))
    //         })
    //     })
    // }

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

// class ControlPanel extends Component {
//     componentDidMount() {
//         Promise.resolve()
//         .then(() => this.createHand(7, 1))
//         .then(() => this.createHand(7, 2))
//     }

//     createHand = (num, player) => {
//         const { unusedTiles, dealPlayerTiles, updateUnusedTiles, endGame } = this.props

//         if (unusedTiles.length >= num) {
//             let playerTiles = []
//             let copyUnusedTiles = [...unusedTiles]
    
//             for (let i = 0; i < num; i++) {
//                 const max = copyUnusedTiles.length - 1
//                 const min = 0
//                 const randomIndex = Math.floor(Math.random() * (max - min) + min)
//                 const foundTile = copyUnusedTiles[randomIndex]
//                 playerTiles.push(foundTile)
//                 copyUnusedTiles = copyUnusedTiles.filter(t => t !== foundTile)
//             }
            
//             updateUnusedTiles(copyUnusedTiles)
//             dealPlayerTiles(playerTiles, player)
//         } else endGame()
//     }

//     handlePass = () => {
//         const { switchTurn, resetExchanged, deselectTile } = this.props

//         switchTurn()
//         resetExchanged()
//         deselectTile()
//     }

//     render() {
//         const { selected, exchanged } = this.props

//         return (
//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <Submit createHand={ this.createHand } />
//                 <Shuffle />
//                 { (selected && !exchanged) && <Exchange /> }
//                 <TileBag />
//                 <button onClick={ this.handlePass }>pass</button>
//                 <EndGame />
//             </div>
//         )
//     }
// }

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

// const mapDispatchToProps = (dispatch) => ({
//     dealPlayerTiles: (gameId, tiles, player) => dispatch(dealPlayerTiles(gameId, tiles, player)),
//     updateUnusedTiles: (gameId, tiles) => dispatch(updateUnusedTiles(gameId, tiles)),
//     switchTurn: (gameId) => dispatch(switchTurn(gameId)),
//     resetExchanged: (gameId) => dispatch(resetExchanged(gameId)),
//     deselectTile: (gameId) => dispatch(deselectTile(gameId)),
//     endGame: (gameId) => dispatch(endGame(gameId)),
//     dealFirstHand: (gameId) => dispatch(dealFirstHand(gameId)),
//     resetGameResume: () => dispatch(resetGameResume())
// })

export default connect(mapStateToProps, {
    dealPlayerTiles,
    updateUnusedTiles,
    endGame,
    dealFirstHand,
    resetGameResume
})(ControlPanel)