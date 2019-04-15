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
            <>
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                { this.props.playerTiles.length > 0 && this.renderPlayerTiles() }
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={ this.props.handleTrySubmit }>submit</button>
                <button>pass</button>
                <button>exchange</button>
                <button>shuffle</button>
            </div>
            </>
        )
    }
}   

export default TileContainer