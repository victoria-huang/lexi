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

const GameOver = ({ 
    playerOne, 
    playerTwo, 
    p1Points, 
    p2Points, 
    clearGame 
}) => {
    return (
        <Modal
            isOpen={ true }
            style={ customStyles }
            contentLabel="game over"
        >
            <div className='flex column center'>
                { 
                    p1Points === p2Points ? 
                    <h2>it's a tie!</h2>
                    :
                    <h2>the winner is { p1Points > p2Points ? playerOne.name : playerTwo.name }!</h2>
                }

                <p>thank you for playing.</p>
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
    playerOne: state.game.playerOne,
    playerTwo: state.game.playerTwo,
    p1Points: state.game.p1Points,
    p2Points: state.game.p2Points
})

export default connect(mapStateToProps, { clearGame })(GameOver)