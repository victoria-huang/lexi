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

const EndGame = ({ endGame, gameId, user }) => {
    const [modal, setModal] = useState(false)

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    const end = () => {
        closeModal()
        endGame(gameId, user._id)
    }

    return (
        <>
        <button onClick={ openModal }>
            end game
        </button>
        <Modal
            isOpen={ modal }
            onRequestClose={ closeModal }
            style={ customStyles }
            contentLabel="end game"
        >
            <div className='flex column center'>
                <h1>are you sure?</h1>
                
                <button 
                    className='endgame-button' 
                    onClick={ end }
                >
                    yes
                </button>

                <button 
                    className='endgame-button' 
                    onClick={ closeModal }
                >
                    no
                </button>
            </div>
        </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    gameId: state.game.gameId,
    user: state.user.currUser
})

const mapDispatchToProps = (dispatch) => ({
    endGame: (gameId, userId) => dispatch(endGame(gameId, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EndGame)