import React, { Component } from 'react'
import Tile from './Tile'

class TileContainer extends Component {
    renderPlayerTiles = () => this.props.playerTiles.map( (t, idx) => 
        <Tile 
            key={ idx }
            { ...t }
            selected={ this.props.selected }
            handleSelectTile={ this.props.handleSelectTile } 
        /> 
    )

    render() {
        return (
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                { this.props.playerTiles.length > 0 && this.renderPlayerTiles() }
            </div>
        )
    }
}   

export default TileContainer