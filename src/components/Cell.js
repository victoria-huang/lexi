import React, { useState } from 'react'
import Modal from 'react-modal'
import v4 from 'uuid'

import { connect } from 'react-redux'
import { 
    updateCells,
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

const Cell = ({ 
    cells, 
    usedCells, 
    selected, 
    playerTiles, 
    tryTiles, 
    whoseTurn,
    updateCells,
    deselectTile,
    addToHand,
    removeFromHand,
    addTryTile,
    removeTryTile,
    _id,
    x,
    y,
    value,
    points,
    bonus 
}) => {
    const isUsedCell = usedCells.includes(_id)

    let color

    switch(bonus) {
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

    const [modal, setModal] = useState(false)
    const [showWords, setShowWords] = useState([])

    const openModal = (showWords) => {
        setModal(true)
        setShowWords(showWords)
    }

    const closeModal = () => {
        setModal(false)
        setShowWords([])
    }

    const handleClickCell = (cellId) => {
        if (!usedCells.includes(cellId)) {
            const copyCells = [...cells]
            const cellIdx = cells.findIndex(c => c._id === cellId)
            const foundCell = { ...cells[cellIdx] }

            if (selected && !foundCell.value) {
                const tile = playerTiles.find(t => t._id === selected)
                foundCell.tileId = tile._id
                foundCell.value = tile.letter 
                foundCell.points = tile.points 
                copyCells[cellIdx] = foundCell

                updateCells(copyCells)
                deselectTile()
                removeFromHand(tile, whoseTurn)
                addTryTile(tile)
            }

            if (!selected && foundCell.value) {
                const tile = tryTiles.find(t => t._id === foundCell.tileId)
                foundCell.value = null
                foundCell.points = null
                copyCells[cellIdx] = foundCell

                updateCells(copyCells)
                addToHand(tile, whoseTurn)
                removeTryTile(tile)
            }
        } else {
            const foundCell = cells.find(cell => cell._id === cellId)
            openModal(foundCell.words)
        }
    }

    return (
        <>
        <g>
            { 
                (bonus && !value) 
                && 
                <text 
                    x={ x + 3 } 
                    y={ bonus === '✴' ? y + 7 : y + 6 } 
                    fontSize={ bonus === '✴' ? '5' : '3' } 
                    fill="black"
                >
                    { bonus }
                </text>
            }
            
            <text 
                x={ x + 2.7 } 
                y={ y + 7 } 
                fontSize="5" 
                fill="black"
            >
                { value }
            </text>

            <text 
                x={ x + 6.5 } 
                y={ y + 3 } 
                fontSize="2.5" 
                fill="red"
            >
                { points }
            </text>

            <rect
                onClick={ () => handleClickCell(_id, x, y) }
                className="rect-svg"
                x={ x }
                y={ y }
                width='10'
                height='10'
                stroke={ isUsedCell ? "rgb(157, 107, 250)" : "black" }
                strokeWidth='0.2'
                fill={ 
                    value ? 
                        isUsedCell ? "rgb(157, 107, 250)" : "rgb(255, 101, 229)"
                        : 
                        color 
                    }
                opacity={ isUsedCell ? "0.45" : "0.3" }
            />
        </g>

        <Modal
            isOpen={ modal }
            onRequestClose={ closeModal }
            style={ customStyles }
            contentLabel="definitions"
        >
            { showWords.map(word => <Definition key={ v4() } { ...word } /> ) }
            
            <div className='flex column'>
                <button 
                    className='modal-button' 
                    onClick={ closeModal }
                >
                    close
                </button>
            </div>
        </Modal>
        </>
    )
    
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
    deselectTile: () => dispatch(deselectTile()),
    addToHand: (tile, player) => dispatch(addToHand(tile, player)),
    removeFromHand: (tile, player) => dispatch(removeFromHand(tile, player)),
    addTryTile: (tile) => dispatch(addTryTile(tile)),
    removeTryTile: (tile) => dispatch(removeTryTile(tile))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cell)