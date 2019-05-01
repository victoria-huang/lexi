import React from 'react'
import v4 from 'uuid'

import { connect } from 'react-redux'

import Tile from './Tile'

const TileContainer = ({
    unusedTiles,
    playerTiles,
    p1Tiles,
    p2Tiles,
    whoseTurn
}) => {
    const renderPlayerTiles = () => {
        const tileIds = ( whoseTurn === 1 ? p1Tiles : p2Tiles )
        const foundPlayerTiles = tileIds.map( tId => playerTiles.find(t => t.id === tId) )
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
    whoseTurn: state.game.whoseTurn
})

export default connect(mapStateToProps)(TileContainer)