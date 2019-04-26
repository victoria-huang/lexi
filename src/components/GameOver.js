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

const GameOver = (props) => {
    return (
        <Modal
            isOpen={ true }
            style={ customStyles }
            contentLabel="game over"
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h2>
                    { props.p1Points === props.p2Points ? 
                        "it's a tie!" 
                        :
                        <>
                        the winner is { props.p1Points > props.p2Points ?
                            props.playerOne
                            :
                            props.playerTwo
                        }!
                        </>
                    }
                </h2>
                
                <p>thank you for playing.</p>
                <p>press the button below to return to the homepage.</p>
                <button className='endgame-button' onClick={ props.clearGame }>return</button>
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