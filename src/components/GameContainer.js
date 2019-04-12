import React, { Component } from 'react'
import { TILES } from '../constants'
import Board from './Board'
import TileContainer from './TileContainer'

class GameContainer extends Component {
    state = {
        cells: [],
        unusedTiles: [],
        playerTiles: [],
        usedTiles: [],
        selected: null,
        tryWords: []
    }

    componentDidMount() {
        this.generatecells()

        this.setState({
            unusedTiles: this.createTileBag()
        }, () => { this.createHand() })
    }

    generatecells = () => {
        let cells = []

        for (let x = 0; x < 150; x += 10) {
            for (let y = 0; y < 150; y += 10) {
                let newCell = {
                    x,
                    y
                }
                cells.push(newCell)
            }
        }

        this.setState({ cells })
    }

    createTileBag = () => {
        let id = 1

        const tiles = TILES.map( t => {
            let newTiles = []

            for (let i = 0; i < t.amount; i++) {
                const newTile = {
                    id,
                    letter: t.letter,
                    points: t.points
                }

                newTiles.push(newTile)
                id++
            }

            return newTiles
        })

        const flattened = [].concat.apply([], tiles);

        return flattened
    }

    createHand() {
        let playerTiles = []
        let unusedTiles = [...this.state.unusedTiles]

        for (let i = 0; i < 7; i++) {
            const max = unusedTiles.length - 1
            const min = 0
            const randomIndex = Math.floor(Math.random() * (max - min) + min)
            const foundTile = unusedTiles[randomIndex]
            playerTiles.push(foundTile)
            unusedTiles = unusedTiles.filter(t => t !== foundTile)
        }

        this.setState({
            unusedTiles,
            playerTiles
        })
    }

    handleSelectTile = (selected) => {
        this.setState({ selected })
    }

    render() {
        return (
            <>
                <Board cells={ this.state.cells } />
                <TileContainer playerTiles={ this.state.playerTiles } selected={ this.state.selected } handleSelectTile={ this.handleSelectTile } />
            </>
        )
    }
}

export default GameContainer