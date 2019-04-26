import React, { Component } from 'react'
import Modal from 'react-modal'
import v4 from 'uuid'

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

import Definition from './Definition'

const customStyles = {
    content: {
        margin: '5% 20% 5% 20%'
    }
}

class Cell extends Component {
    state = { 
        modal: false, 
        showWords: [] 
    }

    openModal = (showWords) => this.setState({ modal: true, showWords })

    closeModal = () => this.setState({ modal: false, showWords: [] })

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
        } else {
            const foundCell = this.props.cells.find(cell => cell.id === cellId)
            console.log(foundCell)
            this.openModal(foundCell.words)
        }
    }

    render() {
        const isUsedCell = this.props.usedCells.includes(this.props.id)
        let color

        switch(this.props.bonus) {
            case 'DL':
                color = 'green'
                break
            case 'TL':
                color = 'blue'
                break
            case 'DW':
                color = 'red'
                break
            case 'TW':
                color = 'orange'
                break
            case '✴':
                color = 'gold'
                break
            default:
                color = 'white'
        }
        
        return (
            <>
            <g>
                { 
                    (this.props.bonus && !this.props.value) 
                    && 
                    <text x={ this.props.x + 3 } y={ this.props.bonus === '✴' ? this.props.y + 7 : this.props.y + 6 } fontSize={ this.props.bonus === '✴' ? '5' : '3' } fill="black">
                        { this.props.bonus }
                    </text>
                }
                
                <text x={ this.props.x + 2.7 } y={ this.props.y + 7 } fontSize="5" fill="black">
                    { this.props.value }
                </text>
                <text x={ this.props.x + 6.5 } y={ this.props.y + 3 } fontSize="2.5" fill="red">{ this.props.points }</text>
                <rect
                    onClick={ () => this.handleClickCell(this.props.id, this.props.x, this.props.y) }
                    className="rect-svg"
                    x={ this.props.x }
                    y={ this.props.y }
                    width='10'
                    height='10'
                    stroke={ isUsedCell ? "rgb(157, 107, 250)" : "black" }
                    strokeWidth='0.2'
                    fill={ 
                        this.props.value ? 
                            isUsedCell ? "rgb(157, 107, 250)" : "rgb(255, 101, 229)"
                            : 
                            color 
                        }
                    opacity={ isUsedCell ? "0.45" : "0.3" }
                />
            </g>

            <Modal
                isOpen={ this.state.modal }
                onRequestClose={ this.closeModal }
                style={ customStyles }
                contentLabel="definitions"
            >
                { this.state.showWords.map(word => <Definition key={ v4() } { ...word } /> ) }

                <button className='modal-button' onClick={ this.closeModal }>close</button>
            </Modal>
            </>
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