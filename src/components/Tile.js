import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
    selectTile,
    deselectTile
} from '../actions'

class Tile extends Component {
    handleSelectTile = (selected) => {
        if (selected === this.props.selected) this.props.deselectTile()
        else this.props.selectTile(selected)
    }

    render() {
        return (   
            <span 
                onClick={ () => this.handleSelectTile( this.props.id ) }
                style={ this.props.selected === this.props.id ? 
                    { backgroundColor: 'pink', paddingRight: '5px', border: '1px solid black', margin: '2px', padding: '2px', cursor: 'pointer' }
                    :
                    { paddingRight: '5px', border: '1px solid black', margin: '2px', padding: '2px', cursor: 'pointer' }
                }
            >
                <h3 style={{ margin: '1px' }}>{ this.props.letter } ({ this.props.points })</h3>
            </span>
        )
    }
}

const mapStateToProps = (state) => ({
    selected: state.tile.selected
})

const mapDispatchToProps = (dispatch) => ({
    selectTile: (tile) => dispatch(selectTile(tile)),
    deselectTile: () => dispatch(deselectTile())
})

export default connect(mapStateToProps, mapDispatchToProps)(Tile)