import React, { Component } from 'react'
import Board from './Board'
import TileContainer from './TileContainer'

class GameContainer extends Component {
    render() {
        return (
            <>
                <Board />
                <TileContainer />
            </>
        )
    }
}

export default GameContainer