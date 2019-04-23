import React, { Component } from 'react'

import { connect } from 'react-redux'

import Board from './Board'
import TileContainer from './TileContainer'
import ErrorContainer from './ErrorContainer'
import ControlPanel from './ControlPanel'

class GameContainer extends Component {
    render() {
        console.log(this.props)
        return (
            <>
            <ErrorContainer />
            <Board />

            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5px'}}>
                <span>Points: { this.props.points }</span>
            </div>

            <TileContainer />
            <ControlPanel />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    points: state.game.points,
    whoseTurn: state.game.whoseTurn
})

export default connect(mapStateToProps)(GameContainer)