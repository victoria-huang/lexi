import React, { Component } from 'react'
import Cell from './Cell'

class Board extends Component {
    renderCells = () => this.props.cells.map( (cell, idx) => <Cell key={idx} x={cell.x} y={cell.y} /> )

    render() {
        return(
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ height: '650px', width: '650px'}}>
                    <svg
                        viewBox={`0 0 150 150`}
                        overflow="visible"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ cursor: "pointer" }}
                    >
                        <g>{ this.renderCells() }</g>
                    </svg>
                </div>
            </div>
        )
    }
} 

export default Board