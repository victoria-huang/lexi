import React, { Component } from 'react'
import v4 from 'uuid'

import { connect } from 'react-redux'

import Tile from './Tile'

class TileContainer extends Component {
    renderPlayerTiles = () => this.props.playerTiles.map( t => <Tile key={ v4() } { ...t } /> )

    render() {
        return (
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                { this.props.playerTiles.length > 0 && this.renderPlayerTiles() }
            </div>
        )
    }
}  

const mapStateToProps = (state) => ({
    playerTiles: state.tile.playerTiles
})

export default connect(mapStateToProps)(TileContainer)