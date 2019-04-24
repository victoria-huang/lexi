import React, { Component } from 'react'
import Modal from 'react-modal'
import v4 from 'uuid'

import { connect } from 'react-redux'
import {
    selectTile,
    deselectTile,
    addToHand,
    removeFromHand,
    updateUsedTiles,
    updateUnusedTiles
} from '../actions'

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

class Tile extends Component {
    state = {
        modal: false,
        selectedTile: ''
    }

    openModal = () => this.setState({ modal: true })

    closeModal = () => this.setState({ modal: false })

    handleChange = (e) => this.setState({ selectedTile: e.target.value })

    handleSubmit = (e) => {
        e.preventDefault()
        const newSelectedId = parseInt(this.state.selectedTile)
        const foundBlankTile = this.props.playerTiles.find(t => t.id === this.props.selected)
        const foundTile = this.props.unusedTiles.find(t => t.id === newSelectedId)
        const unusedTiles = this.props.unusedTiles.filter(t => t.id !== newSelectedId)

        this.closeModal()
        this.props.deselectTile()
        this.props.addToHand(foundTile, this.props.whoseTurn)
        this.props.removeFromHand(foundBlankTile, this.props.whoseTurn)
        this.props.updateUsedTiles(foundBlankTile)
        this.props.updateUnusedTiles(unusedTiles)
        this.props.selectTile(newSelectedId)
    }

    handleCancel = () => {
        this.closeModal()
        this.props.deselectTile()
    }

    handleSelectTile = (selected) => {
        if (selected === this.props.selected) this.props.deselectTile()
        else this.props.selectTile(selected)

        // if blank tile
        if (selected === 99 || selected === 100) this.openModal()
    }

    getOptionsForSelectTile = () => {
        const noBlankTiles = this.props.unusedTiles.filter( t => t.letter !== '' )
        const uniqueLetters = []
        const uniqueArr = []

        noBlankTiles.forEach(t => {
            if (!uniqueLetters.includes(t.letter)) {
                uniqueLetters.push(t.letter)
                const tileObj = { ...t, numLeft: 1 }
                uniqueArr.push(tileObj)
            } else {
                const foundTileObj = uniqueArr.find(tile => tile.letter === t.letter)
                foundTileObj.numLeft++
            }
        })

        return uniqueArr
    }

    render() {
        return (   
            <>
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

            <Modal
                isOpen={this.state.modal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="select a tile"
            >
                <h2>select a tile</h2>
                <form onSubmit={ this.handleSubmit }>
                    <select onChange={ this.handleChange } value={ this.state.selectedTile }>
                        { this.getOptionsForSelectTile().map( t => 
                            <option 
                                key= { v4() }
                                value={ t.id }
                            >
                                { t.letter } ({ t.points }) - { t.numLeft } tiles left
                            </option> 
                            )
                        }
                    </select>
                    <br />
                    <input type='submit' value='submit' />
                </form>
                <div>
                    <button onClick={ this.handleCancel }>cancel</button>
                </div>
            </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    playerTiles: state.tile.playerTiles,
    unusedTiles: state.tile.unusedTiles,
    selected: state.tile.selected,
    whoseTurn: state.game.whoseTurn
})

const mapDispatchToProps = (dispatch) => ({
    selectTile: (tile) => dispatch(selectTile(tile)),
    deselectTile: () => dispatch(deselectTile()),
    addToHand: (tile, player) => dispatch(addToHand(tile, player)),
    removeFromHand: (tile, player) => dispatch(removeFromHand(tile, player)),
    updateUsedTiles: (tile) => dispatch(updateUsedTiles(tile)),
    updateUnusedTiles: (tiles) => dispatch(updateUnusedTiles(tiles))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tile)