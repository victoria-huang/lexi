import React, { Component } from 'react'

import { connect } from 'react-redux'
import { 
    updateCells,
    selectTile,
    deselectTile,
    addToHand,
    removeFromHand,
    addTryTile,
    removeTryTile
} from '../actions'

class Cell extends Component {
    handleClickCell = (cellId) => {
        if (!this.props.usedCells.includes(cellId)) {
            const cells = [...this.props.cells]
            const cellIdx = cells.findIndex(c => c.id === cellId)
            const foundCell = { ...this.props.cells[cellIdx] }

            if (this.props.selected && !foundCell.value) {
                const tile = this.props.playerTiles.find(t => t.id === this.props.selected)
                foundCell.tileId = tile.id
                foundCell.value = tile.letter 
                foundCell.points = tile.points 
                cells[cellIdx] = foundCell

                this.props.updateCells(cells)
                this.props.deselectTile()
                this.props.removeFromHand(tile, this.props.whoseTurn)
                this.props.addTryTile(tile)
            }

            if (!this.props.selected && foundCell.value) {
                const tile = this.props.tryTiles.find(t => t.id === foundCell.tileId)
                foundCell.value = null
                foundCell.points = null
                cells[cellIdx] = foundCell

                this.props.updateCells(cells)
                this.props.addToHand(tile, this.props.whoseTurn)
                this.props.removeTryTile(tile)
            }
        }  
    }

    render() {
        const isUsedCell = this.props.usedCells.includes(this.props.id)

        return (
            <g>
                <text x={ this.props.x + 3 } y={ this.props.y + 7 } fontFamily="Verdana" fontSize="5" fill="blue">{ this.props.value }</text>
                <text x={ this.props.x + 6 } y={ this.props.y + 3 } fontFamily="Verdana" fontSize="2.5" fill="red">{ this.props.points }</text>
                <rect
                    onClick={ () => this.handleClickCell(this.props.id, this.props.x, this.props.y) }
                    className="rect-svg"
                    x={this.props.x}
                    y={this.props.y}
                    width='10'
                    height='10'
                    stroke={ isUsedCell ? "green" : "black" }
                    strokeWidth='0.5'
                    fill={ 
                        this.props.value ? 
                            isUsedCell ? "green" : "purple"
                            : 
                            "white" 
                        }
                    opacity={ isUsedCell ? "0.45" : "0.3" }
                />
            </g>
        )
    }
}

const mapStateToProps = (state) => ({
    cells: state.cell.allCells,
    usedCells: state.cell.usedCells,
    selected: state.tile.selected,
    playerTiles: state.tile.playerTiles,
    tryTiles: state.tile.tryTiles,
    whoseTurn: state.game.whoseTurn
})

const mapDispatchToProps = (dispatch) => ({
    updateCells: (cells) => dispatch(updateCells(cells)),
    selectTile: (tile) => dispatch(selectTile(tile)),
    deselectTile: () => dispatch(deselectTile()),
    addToHand: (tile, player) => dispatch(addToHand(tile, player)),
    removeFromHand: (tile, player) => dispatch(removeFromHand(tile, player)),
    addTryTile: (tile) => dispatch(addTryTile(tile)),
    removeTryTile: (tile) => dispatch(removeTryTile(tile))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cell)