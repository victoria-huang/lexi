import React, { Component } from 'react'
import Board from './Board'
import TileContainer from './TileContainer'

class GameContainer extends Component {
    state = {
        tryWords: []
    }

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