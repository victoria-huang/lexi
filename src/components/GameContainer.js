import React, { Component } from 'react'
import { TILES } from '../constants'
import Board from './Board'
import TileContainer from './TileContainer'
import ErrorContainer from './ErrorContainer'

class GameContainer extends Component {
    state = {
        cells: [],
        unusedTiles: [],
        playerTiles: [],
        usedTiles: [],
        selected: null,
        tryTiles: [],
        errors: []
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
                tryTiles: this.state.tryTiles.concat(tile)
            })
        }

        if (!this.state.selected && foundCell.value) {
            const tile = this.state.tryTiles.find(t => t.id === foundCell.tileId)
            foundCell.value = null
            foundCell.points = null
            cells[cellIdx] = foundCell

            this.setState({ 
                cells,
                playerTiles: this.state.playerTiles.concat(tile),
                tryTiles: this.state.tryTiles.filter(t => t.id !== tile.id)
            })
        }
    }

    findFilledCells = () => this.state.cells.filter(c => c.value)

    findTryCells = () => this.findFilledCells().filter(c => this.state.tryTiles.find(t => t.id === c.tileId))

    handleTrySubmit = () => {
        // const filledCells = this.findFilledCells()
        const tryCells = this.findTryCells()
        // const tryCellX = tryCells.map(c => c.x)
        // const tryCellY = tryCells.map(c => c.y)
        const distinctX = [...new Set(tryCells.map(c => c.x))]
        const distinctY = [...new Set(tryCells.map(c => c.y))]

        this.setState({ errors: [] }, () => {
            // test length of word
            if (tryCells.length < 2) {
                const error = { message: "Words must be at least 2 letters long." }

                this.setState({
                    errors: this.state.errors.concat(error)
                })
            }

            // test adjancency of tiles
            if (tryCells.length > 1 && distinctX.length > 1 && distinctY.length > 1) {
                const error = { message: "New tiles must be placed adjacent to one another in one direction." }

                this.setState({
                    errors: this.state.errors.concat(error)
                })
            } else {
                const firstLetter = tryCells[0]
                const lastLetter = tryCells[tryCells.length - 1]
                const maxDistance = tryCells.length * 10
                let distance;

                // test vertical word
                if (tryCells.length > 1 && distinctX.length === 1 && distinctY.length > 1) {
                    distance = lastLetter.y - firstLetter.y + 10
                }

                // test horizontal word
                if (tryCells.length > 1 && distinctY.length === 1 && distinctX.length > 1) {
                    distance = lastLetter.x - firstLetter.x + 10
                }

                // 1. test adjancency
                if (distance > maxDistance) {
                    const error = { message: "New tiles must be placed adjacent to one another." }

                    this.setState({
                        errors: this.state.errors.concat(error)
                    })
                } else {
                    // 2. get word and test validity
                    const word = tryCells.map(cell => cell.value).join('')
                    console.log(word)
                }
            }
        })
    }

    render() {
        return (
            <>
                <ErrorContainer 
                    errors={ this.state.errors }
                />
                <Board 
                    cells={ this.state.cells } 
                    handleClickCell = { this.handleClickCell }
                />
                <TileContainer 
                    playerTiles={ this.state.playerTiles } 
                    selected={ this.state.selected } 
                    handleSelectTile={ this.handleSelectTile } 
                    handleTrySubmit={ this.handleTrySubmit }
                />
            </>
        )
    }
}

export default GameContainer