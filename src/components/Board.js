import React, { Component } from 'react'
import v4 from 'uuid'

import { connect } from 'react-redux'

import Cell from './Cell'

class Board extends Component {
    renderCells = () => this.props.cells.map( cell => <Cell key={ v4() } { ...cell } /> )

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

const mapStateToProps = (state) => ({
    cells: state.cell.allCells,
    usedCells: state.cell.usedCells
})

export default connect(mapStateToProps)(Board)