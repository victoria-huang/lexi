import React, { Component } from 'react'

import { connect } from 'react-redux'

import Board from './Board'
import TileContainer from './TileContainer'
import ErrorContainer from './ErrorContainer'
import ControlPanel from './ControlPanel'

class GameContainer extends Component {
    render() {
        return (
            <div className='container'>
                <div className='top-wrapper'>
                    <h1 className={ this.props.whoseTurn === 1 ? 'turn game-header' : 'game-header'}>
                        { this.props.playerOne }: { this.props.p1Points }
                    </h1>

                    <h1 className='game-header'>
                        l e x i .
                    </h1>

                    <h1 className={ this.props.whoseTurn === 2 ? 'turn game-header' : 'game-header'}>
                        { this.props.playerTwo }: { this.props.p2Points }
                    </h1>
                </div>
                
                <ErrorContainer />
                <Board />
                <TileContainer />
                <ControlPanel />
            </div>
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