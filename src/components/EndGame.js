import React, { useState } from 'react'
import Modal from 'react-modal'

import { connect } from 'react-redux'
import { endGame } from '../actions'

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

const EndGame = ({ endGame }) => {
    const [modal, setModal] = useState(false)

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    const end = () => {
        closeModal()
        endGame()
    }

    return (
        <>
        <button onClick={ openModal }>end game</button>
        <Modal
            isOpen={ modal }
            onRequestClose={ closeModal }
            style={ customStyles }
            contentLabel="end game"
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1>are you sure?</h1>
                <button className='endgame-button' onClick={ end }>yes</button>
                <button className='endgame-button' onClick={ closeModal }>no</button>
            </div>
        </Modal>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
    endGame: () => dispatch(endGame())
})

export default connect(null, mapDispatchToProps)(EndGame)