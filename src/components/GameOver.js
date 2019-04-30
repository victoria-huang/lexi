import React from 'react'
import Modal from 'react-modal'

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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                { 
                    p1Points === p2Points ? 
                    <h2>it's a tie!</h2>
                    :
                    <h2>the winner is { p1Points > p2Points ? playerOne : playerTwo }!</h2>
                }

                <p>thank you for playing.</p>
                <p>press the button below to return to the homepage.</p>
                <button className='endgame-button' onClick={ clearGame }>return</button>
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

const mapDispatchToProps = (dispatch) => ({
    clearGame: () => dispatch(clearGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)