import React, { Component } from 'react'

class Tile extends Component {
    render() {
        return (   
            <span style={{ paddingRight: '5px', border: '1px solid black', margin: '2px', padding: '2px', cursor: 'pointer' }}>
                <h3 style={{ margin: '1px' }}>{ this.props.letter } ({ this.props.points })</h3>
            </span>
        )
    }
}

export default Tile