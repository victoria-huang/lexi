import React from 'react'

import Modal from 'react-modal'
import { Link } from 'react-router-dom'

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

const NoPlayers = ({ 
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

                <p>looks like there are not enough players here.</p>
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

export default NoPlayers