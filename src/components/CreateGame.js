import React, { useState } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import v4 from 'uuid'
import Modal from 'react-modal'

import { setPlayers } from '../actions'

const customStyles = {
    content: {
        margin: '20% 5% 20% 5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

const CreateGame = ({ 
    user, 
    allUsers, 
    setPlayers,
    history 
}) => {
    const handleStartGame = (p2) => {
        setPlayers({
            name: user.name,
            userId: user._id,
            username: user.username,
            email: user.email
        }, {
            name: p2.name,
            userId: p2._id,
            username: p2.username,
            email: p2.email
        })
        .then(() => history.push('/game'))
    }

    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState('')

    const openModal = () => setModal(true)
    const closeModal = () => {
        setSearch('')
        setModal(false)
    }

    const findUsers = () => allUsers.filter(u => 
        u.username.toLowerCase().includes(search.toLowerCase())
    )

    const renderUsers = () => findUsers().map(u => {
        if (u._id !== user._id) {
            return <div key={ v4() } className='flex' style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2vh' }}>
                <img 
                    src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' 
                    alt='profile-pic'
                    className='play-avatar' 
                />
                <span>{ u.username }</span>
                <button onClick={ () => handleStartGame(u) }>
                    &#9654; 
                </button>
            </div>
        } else {
            return null
        }
    })

    return (
        <>
        <div 
            className='flex center create-game'
            onClick={ openModal }
        >
            <span>+</span>
        </div>
        <Modal
            isOpen={ modal }
            onRequestClose={ closeModal }
            style={ customStyles }
            contentLabel="tile bag"
        >
            <h3>start a new game</h3>
            <p>search for a user</p>
            
            <input 
                className='search-user'
                type='text'
                placeholder='type username or email here...'
                value={ search } 
                onChange={ (e) => setSearch(e.target.value) }
            />

            <div className='flex column' style={{ width: '80%', marginTop: '2vh' }}>
                { search && renderUsers() }
            </div>
        </Modal>
    </>
    )
}

const mapStateToProps = state => ({
    user: state.user.currUser,
    allUsers: state.user.allUsers
})

export default connect(
    mapStateToProps, 
    { setPlayers }
)(withRouter(CreateGame))