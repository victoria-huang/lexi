// import React, { Component } from 'react'
import React, { useEffect, useRef } from 'react'

import { connect } from 'react-redux'
import {
    updateUnusedTiles,
    dealPlayerTiles,
    switchTurn,
    endGame,
    resetExchanged,
    deselectTile,
    dealFirstHand
} from '../actions'

import Submit from './Submit'
import Shuffle from './Shuffle'
import Exchange from './Exchange'
import TileBag from './TileBag'
import EndGame from './EndGame'

const ControlPanel = ({ 
    unusedTiles, 
    dealPlayerTiles, 
    updateUnusedTiles, 
    endGame,  
    switchTurn, 
    resetExchanged, 
    deselectTile,
    selected, 
    exchanged,
    firstHandDealt,
    dealFirstHand
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

            if (!firstHandDealt) dealFirstHand()

            updateUnusedTiles(copyUnusedTiles)
            dealPlayerTiles(playerTiles, player)
        } else endGame()
    }

    const handlePass = () => {
        switchTurn()
        resetExchanged()
        deselectTile()
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Submit createHand={ createHand } />
            <Shuffle />
            { (selected && !exchanged) && <Exchange /> }
            <TileBag />
            <button onClick={ handlePass }>pass</button>
            <EndGame />
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
    unusedTiles: state.tile.unusedTiles,
    selected: state.tile.selected,
    exchanged: state.game.exchanged,
    firstHandDealt: state.game.firstHandDealt
})

const mapDispatchToProps = (dispatch) => ({
    dealPlayerTiles: (tiles, player) => dispatch(dealPlayerTiles(tiles, player)),
    updateUnusedTiles: (tiles) => dispatch(updateUnusedTiles(tiles)),
    switchTurn: () => dispatch(switchTurn()),
    resetExchanged: () => dispatch(resetExchanged()),
    deselectTile: () => dispatch(deselectTile()),
    endGame: () => dispatch(endGame()),
    dealFirstHand: () => dispatch(dealFirstHand())
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)