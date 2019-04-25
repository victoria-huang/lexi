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
        this.openModal()
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
                    { height: '3%', width: '4.5%', backgroundColor: 'rgb(244, 204, 237)', border: '1px solid gray', borderRadius: '4px', margin: '5px', padding: '5px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '0.8fr 0.2fr', gridTemplateRows: '0.2fr 1fr' }
                    :
                    { height: '3%', width: '4.5%', backgroundColor: 'lightblue', border: 'none', borderRadius: '4px', margin: '5px', padding: '5px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '0.8fr 0.2fr', gridTemplateRows: '0.2fr 1fr' }
                }
            >
                <h3 style={{ margin: '1px', textAlign: 'center', fontSize: '1em', gridColumn: 1, gridRow: 2 }}>{ this.props.letter !== '' ? this.props.letter : <div style={{ color: 'lightblue' }}>*</div> }</h3>
                <span style={{ gridColumn: 2, gridRow: 1, textAlign: 'center', fontSize: '0.5em' }}>{ this.props.points }</span>
            </span>

            <Modal
                isOpen={ this.state.modal }
                onRequestClose={ this.closeModal }
                style={ customStyles }
                contentLabel="select a tile"
            >
                <h2>select a tile</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', justifyContent: 'center', gridGap: '3px' }}>
                    { this.getOptionsForSelectTile().map( t => 
                        <div key= { v4() } style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span 
                                onClick={ () => this.handleChange( t.id ) }
                                style={ this.state.selectedTile === t.id ? 
                                    { height: '50%', width: '30%', backgroundColor: 'rgb(244, 204, 237)', border: '1px solid gray', borderRadius: '4px', margin: '5px', padding: '5px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '0.8fr 0.2fr', gridTemplateRows: '0.2fr 1fr' }
                                    :
                                    { height: '50%', width: '30%', backgroundColor: 'lightblue', border: 'none', borderRadius: '4px', margin: '5px', padding: '5px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '0.8fr 0.2fr', gridTemplateRows: '0.2fr 1fr' }
                                }
                            >
                                <h3 style={{ margin: '1px', textAlign: 'center', fontSize: '1em', gridColumn: 1, gridRow: 2 }}>{ t.letter !== '' ? t.letter : <div style={{ color: 'lightblue' }}>*</div> }</h3>
                                <span style={{ gridColumn: 2, gridRow: 1, textAlign: 'center', fontSize: '0.5em' }}>{ t.points }</span>
                            </span>
                            <span style={{ fontSize: '0.8em' }}>{ t.numLeft } remaining</span>
                        </div>
                        )
                    }
                    </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className='modal-button' onClick={ this.handleSubmit }>submit</button>
                    <button className='modal-button' onClick={ this.handleCancel }>cancel</button>
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