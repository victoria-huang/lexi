import React, { Component } from 'react'

import { connect } from 'react-redux'

import Board from './Board'
import TileContainer from './TileContainer'
import ErrorContainer from './ErrorContainer'

class GameContainer extends Component {
    render() {
        return (
            <>
            <ErrorContainer />
            <Board />

            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5px'}}>
                <span>Points: { this.props.points }</span>
            </div>

            <TileContainer />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    points: state.game.points
})

export default connect(mapStateToProps)(GameContainer)