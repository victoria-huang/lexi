import React from 'react'
import v4 from 'uuid'

import { connect } from 'react-redux'

import Tile from './Tile'

const TileContainer = ({
    unusedTiles,
    playerTiles,
    p1Tiles,
    p2Tiles,
    whoseTurn,
    user,
    playerOne,
    playerTwo
}) => {
    const renderPlayerTiles = () => {
        let tileIds = ( user._id === playerOne.userId ? p1Tiles : p2Tiles )
        // self practice game
        if (playerOne.userId === playerTwo.userId) 
            tileIds = ( whoseTurn === 1 ? p1Tiles : p2Tiles )
        
        const foundPlayerTiles = tileIds.map( tId => playerTiles.find(t => t._id === tId) )
        return foundPlayerTiles.map( t => <Tile key={ v4() } { ...t } /> )
    }
    
    return (
        <>
        <div className='num-remaining-tiles flex center'>
            { unusedTiles.length } tiles remaning
        </div>
        <div className='flex center'>
            { playerTiles.length > 0 && renderPlayerTiles() }
        </div>
        </>
    )
}  

const mapStateToProps = (state) => ({
    unusedTiles: state.tile.unusedTiles,
    playerTiles: state.tile.playerTiles,
    p1Tiles: state.tile.p1Tiles,
    p2Tiles: state.tile.p2Tiles,
    whoseTurn: state.game.whoseTurn,
    user: state.user.currUser,
    playerOne: state.game.playerOne,
    playerTwo: state.game.playerTwo
})

export default connect(mapStateToProps)(TileContainer)