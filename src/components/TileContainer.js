import React, { Component } from 'react'
import v4 from 'uuid'

import { connect } from 'react-redux'

import Tile from './Tile'

class TileContainer extends Component {
    renderPlayerTiles = () => {
        const tileIds = ( this.props.whoseTurn === 1 ? this.props.p1Tiles : this.props.p2Tiles )
        const playerTiles = this.props.playerTiles.filter( pt => tileIds.includes(pt.id) )
        return playerTiles.map( t => <Tile key={ v4() } { ...t } /> )
    }

    render() {
        return (
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                { this.props.playerTiles.length > 0 && this.renderPlayerTiles() }
            </div>
        )
    }
}  

const mapStateToProps = (state) => ({
    playerTiles: state.tile.playerTiles,
    p1Tiles: state.tile.p1Tiles,
    p2Tiles: state.tile.p2Tiles,
    whoseTurn: state.game.whoseTurn
})

export default connect(mapStateToProps)(TileContainer)