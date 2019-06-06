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

        const foundBlankTile = this.props.playerTiles.find(t => t._id === this.props.selected)
        const foundTile = this.props.unusedTiles.find(t => t._id === this.state.selectedTile)
        const unusedTiles = this.props.unusedTiles.filter(t => t._id !== this.state.selectedTile)

        this.closeModal()
        this.props.deselectTile(this.props.gameId)
        this.props.addToHand(this.props.gameId, foundTile, this.props.whoseTurn)
        this.props.removeFromHand(this.props.gameId, foundBlankTile, this.props.whoseTurn)
        this.props.updateUsedTiles(this.props.gameId, foundBlankTile)
        this.props.updateUnusedTiles(this.props.gameId, unusedTiles)
        this.props.selectTile(this.props.gameId, this.state.selectedTile)
    }

    handleCancel = () => {
        this.closeModal()
        this.props.deselectTile(this.props.gameId)
        this.setState({ selectedTile: '' })
    }

    handleSelectTile = (selected, letter) => {
        let player = ( this.props.user._id === this.props.playerOne.userId ? 1 : 2 )
        if (this.props.whoseTurn !== player && this.props.playerOne.userId !== this.props.playerTwo.userId) return
        
        if (selected === this.props.selected) this.props.deselectTile(this.props.gameId)
        else this.props.selectTile(this.props.gameId, selected)

        // if blank tile
        if (letter === ' ') this.openModal()
    }

    getOptionsForSelectTile = () => {
        const noBlankTiles = this.props.unusedTiles.filter( t => t.letter !== ' ' )
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
                onClick={ () => this.handleSelectTile( this.props._id, this.props.letter ) }
                className='tile hand-tile'
                style={ 
                    this.props.selected === this.props._id ? 
                    { backgroundColor: 'rgb(244, 204, 237)', border: '1px solid gray' }
                    :
                    { backgroundColor: 'lightblue', border: 'none' }
                }
            >
                <h3 className='letter'>
                    { 
                        this.props.letter !== ' ' ? 
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
                                onClick={ () => this.handleChange( t._id ) }
                                className='tile select-tile'
                                style={ 
                                    this.state.selectedTile === t._id ? 
                                    { backgroundColor: 'rgb(244, 204, 237)', border: '1px solid gray' }
                                    :
                                    { backgroundColor: 'lightblue', border: 'none' }
                                }
                            >
                                <h3 className='letter'>
                                    { 
                                        t.letter !== ' ' ? 
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
    gameId: state.game.gameId,
    playerTiles: state.tile.playerTiles,
    unusedTiles: state.tile.unusedTiles,
    selected: state.tile.selected,
    whoseTurn: state.game.whoseTurn,
    user: state.user.currUser,
    playerOne: state.game.playerOne,
    playerTwo: state.game.playerTwo
})

// const mapDispatchToProps = (dispatch) => ({
//     selectTile: (gameId, tile) => dispatch(selectTile(gameId, tile)),
//     deselectTile: (gameId) => dispatch(deselectTile(gameId)),
//     addToHand: (gameId, tile, player) => dispatch(addToHand(gameId, tile, player)),
//     removeFromHand: (gameId, tile, player) => dispatch(removeFromHand(gameId, tile, player)),
//     updateUsedTiles: (gameId, tile) => dispatch(updateUsedTiles(gameId, tile)),
//     updateUnusedTiles: (gameId, tiles) => dispatch(updateUnusedTiles(gameId, tiles))
// })

export default connect(mapStateToProps, {
    selectTile,
    deselectTile,
    addToHand,
    removeFromHand,
    updateUsedTiles,
    updateUnusedTiles
})(Tile)