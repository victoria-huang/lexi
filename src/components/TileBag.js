import React, { useState } from 'react'

import Modal from 'react-modal'
import v4 from 'uuid'
import { connect } from 'react-redux'

const customStyles = {
    content: {
        margin: '5% 20% 5% 20%'
    }
}

const TileBag = ({ unusedTiles }) => {
    const [modal, setModal] = useState(false)
    
    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    const getTiles = () => {
        const noBlankTiles = unusedTiles.filter( t => t.letter !== ' ' )
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

    return (
        <>
        <button onClick={ openModal }>tiles</button>
        <Modal
            isOpen={ modal }
            onRequestClose={ closeModal }
            style={ customStyles }
            contentLabel="tile bag"
        >
            <h3>{ unusedTiles.length } tiles remaining</h3>
            <div className='select-tile-container'>
            { getTiles().map( t => 
                <div key= { v4() } className='flex column center'>
                    <span 
                        className='tile select-tile bag-tile'>
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
    unusedTiles: state.tile.unusedTiles
})

export default connect(mapStateToProps)(TileBag)