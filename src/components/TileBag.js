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
        const noBlankTiles = unusedTiles.filter( t => t.letter !== '' )
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
        <button onClick={ openModal }>tile bag</button>
        <Modal
            isOpen={ modal }
            onRequestClose={ closeModal }
            style={ customStyles }
            contentLabel="tile bag"
        >
            <h2>{ unusedTiles.length } tiles remaining</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', justifyContent: 'center', gridGap: '3px' }}>
            { getTiles().map( t => 
                <div 
                    key= { v4() } 
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                    <span style={{ height: '50%', width: '30%', backgroundColor: 'lightblue', border: 'none', borderRadius: '4px', margin: '5px', padding: '5px', display: 'grid', gridTemplateColumns: '0.8fr 0.2fr', gridTemplateRows: '0.2fr 1fr' }}>
                        <h3 style={{ margin: '1px', textAlign: 'center', fontSize: '1em', gridColumn: 1, gridRow: 2 }}>
                            { 
                                t.letter !== '' ? 
                                t.letter 
                                : 
                                <div style={{ color: 'lightblue' }}>*</div> 
                            }
                        </h3>
                        <span style={{ gridColumn: 2, gridRow: 1, textAlign: 'center', fontSize: '0.5em' }}>
                            { t.points }
                        </span>
                    </span>
                    <span style={{ fontSize: '0.8em' }}>
                        { t.numLeft } remaining
                    </span>
                </div>
                )
            }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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