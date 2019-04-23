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

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '5px'}}>
                <div>{ this.props.playerOne }: { this.props.p1Points } points</div> 
                <div>{ this.props.playerTwo }: { this.props.p2Points } points</div>
            </div>

            <TileContainer />
            <ControlPanel />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    p1Points: state.game.p1Points,
    p2Points: state.game.p2Points,
    whoseTurn: state.game.whoseTurn,
    playerOne: state.game.playerOne,
    playerTwo: state.game.playerTwo
})

export default connect(mapStateToProps)(GameContainer)