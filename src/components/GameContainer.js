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
        let id = 1

        for (let x = 0; x < 150; x += 10) {
            for (let y = 0; y < 150; y += 10) {
                let newCell = { id, x, y }
                cells.push(newCell)
                id++
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
        if (selected === this.state.selected) {
            this.setState({ selected: null })
        } else {
            this.setState({ selected })
        } 
    }

    handleClickCell = (cellId) => {
        const cells = [...this.state.cells]
        const cellIdx = cells.findIndex(c => c.id === cellId)
        const foundCell = { ...this.state.cells[cellIdx] }

        if (this.state.selected && !foundCell.value) {
            const tile = this.state.playerTiles.find(t => t.id === this.state.selected)
            foundCell.tileId = tile.id
            foundCell.value = tile.letter 
            foundCell.points = tile.points 
            cells[cellIdx] = foundCell

            this.setState({ 
                cells, 
                selected: null, 
                playerTiles: this.state.playerTiles.filter(pt => pt.id !== tile.id),
                usedTiles: this.state.usedTiles.concat(tile)
            })
        }

        if (!this.state.selected && foundCell.value) {
            const tile = this.state.usedTiles.find(t => t.id === foundCell.tileId)
            foundCell.value = null
            foundCell.points = null
            cells[cellIdx] = foundCell

            this.setState({ 
                cells,
                playerTiles: this.state.playerTiles.concat(tile),
                usedTiles: this.state.usedTiles.filter(t => t.id !== tile.id)
            })
        }
    }

    render() {
        return (
            <>
                <Board 
                    cells={ this.state.cells } 
                    handleClickCell = { this.handleClickCell }
                />
                <TileContainer 
                    playerTiles={ this.state.playerTiles } 
                    selected={ this.state.selected } 
                    handleSelectTile={ this.handleSelectTile } 
                />
            </>
        )
    }
}

export default GameContainer