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

const customStyles = {
    content: {
        margin: '5% 20% 5% 20%'
    }
}

class Tile extends Component {
    state = {
        modal: false,
        selectedTile: ''
    }

    openModal = () => this.setState({ modal: true })

    closeModal = () => this.setState({ modal: false })

    handleChange = (id) => this.setState({ selectedTile: id })

    handleSubmit = () => {
        if (!this.state.selectedTile) {
            this.handleCancel()
            return 
        }

        const foundBlankTile = this.props.playerTiles.find(t => t.id === this.props.selected)
        const foundTile = this.props.unusedTiles.find(t => t.id === this.state.selectedTile)
        const unusedTiles = this.props.unusedTiles.filter(t => t.id !== this.state.selectedTile)

        this.closeModal()
        this.props.deselectTile()
        this.props.addToHand(foundTile, this.props.whoseTurn)
        this.props.removeFromHand(foundBlankTile, this.props.whoseTurn)
        this.props.updateUsedTiles(foundBlankTile)
        this.props.updateUnusedTiles(unusedTiles)
        this.props.selectTile(this.state.selectedTile)
    }

    handleCancel = () => {
        this.closeModal()
        this.props.deselectTile()
        this.setState({ selectedTile: '' })
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
                className='tile hand-tile'
                style={ 
                    this.props.selected === this.props.id ? 
                    { backgroundColor: 'rgb(244, 204, 237)', border: '1px solid gray' }
                    :
                    { backgroundColor: 'lightblue', border: 'none' }
                }
            >
                <h3 className='letter'>
                    { 
                        this.props.letter !== '' ? 
                        this.props.letter 
                        : 
                        <div className='blank-tile'>*</div> 
                    }
                </h3>
                <span className='points'>
                    { this.props.points }
                </span>
            </span>

            <Modal
                isOpen={ this.state.modal }
                onRequestClose={ this.handleCancel }
                style={ customStyles }
                contentLabel="select a tile"
            >
                <h2>select a tile</h2>
                    <div className='select-tile-container'>
                    { this.getOptionsForSelectTile().map( t => 
                        <div key= { v4() } className='flex column center'>
                            <span 
                                onClick={ () => this.handleChange( t.id ) }
                                className='tile select-tile'
                                style={ 
                                    this.state.selectedTile === t.id ? 
                                    { backgroundColor: 'rgb(244, 204, 237)', border: '1px solid gray' }
                                    :
                                    { backgroundColor: 'lightblue', border: 'none' }
                                }
                            >
                                <h3 className='letter'>
                                    { 
                                        t.letter !== '' ? 
                                        t.letter 
                                        : 
                                        <div className='blank-tile'>*</div> 
                                    }
                                </h3>
                                <span className='points'>
                                    { t.points }
                                </span>
                            </span>
                            <span className='num-remaining-letter'>
                                { t.numLeft } remaining
                            </span>
                        </div>
                        )
                    }
                    </div>

                <div className='flex center'>
                    <button 
                        className='modal-button' 
                        onClick={ this.handleSubmit }
                    >
                        submit
                    </button>
                    <button 
                        className='modal-button' 
                        onClick={ this.handleCancel }
                    >
                        cancel
                    </button>
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