import React from 'react'

import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { clearGame } from '../actions'

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

const Declined = ({ 
    playerTwo,
    clearGame 
}) => {
    return (
        <Modal
            isOpen={ true }
            style={ customStyles }
            contentLabel="game over"
        >
            <div className='flex column center'>
                <h2>we're sorry.</h2>
                <h3>{ playerTwo.name } has declined your game request.</h3>

                <p>press the button below to return to the homepage.</p>
                
                <Link to='/' className='endgame-link flex center'>
                    <button 
                        className='endgame-button' 
                        onClick={ clearGame }
                    >
                        return
                    </button>
                </Link>
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    playerTwo: state.game.playerTwo
})

// const mapDispatchToProps = (dispatch) => ({
//     clearGame: () => dispatch(clearGame())
// })

export default connect(mapStateToProps, { clearGame })(Declined)