import React from 'react'

import v4 from 'uuid'
import { connect } from 'react-redux'

import Cell from './Cell'

const Board = ({ cells }) => {
    const renderCells = () => cells.map( cell => <Cell key={ v4() } { ...cell } /> )

    return(
        <div className='board-container flex center'>
            <div className='board'>
                <svg
                    viewBox={`0 0 150 150`}
                    overflow="visible"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ cursor: "pointer" }}
                >
                    <g>{ renderCells() }</g>
                </svg>
            </div>
        </div>
    )
} 

const mapStateToProps = (state) => ({
    cells: state.cell.allCells
})

export default connect(mapStateToProps)(Board)