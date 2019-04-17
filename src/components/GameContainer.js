import React, { Component } from 'react'
import { TILES } from '../constants'
import Board from './Board'
import TileContainer from './TileContainer'
import ErrorContainer from './ErrorContainer'

class GameContainer extends Component {
    state = {
        cells: [],
        usedCells: [],
        unusedTiles: [],
        playerTiles: [],
        usedTiles: [],
        selected: null,
        tryTiles: [],
        errors: [],
        points: 0
    }

    componentDidMount() {
        this.generatecells()

        this.setState({
            unusedTiles: this.createTileBag()
        }, () => { this.createHand(7) })
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

    createHand(num) {
        if (this.state.unusedTiles.length >= num) {
            let playerTiles = []
            let unusedTiles = [...this.state.unusedTiles]
    
            for (let i = 0; i < num; i++) {
                const max = unusedTiles.length - 1
                const min = 0
                const randomIndex = Math.floor(Math.random() * (max - min) + min)
                const foundTile = unusedTiles[randomIndex]
                playerTiles.push(foundTile)
                unusedTiles = unusedTiles.filter(t => t !== foundTile)
            }
    
            this.setState({
                unusedTiles,
                playerTiles: this.state.playerTiles.concat(playerTiles)
            })
        }  
    }

    handleSelectTile = (selected) => {
        if (selected === this.state.selected) {
            this.setState({ selected: null })
        } else {
            this.setState({ selected })
        } 
    }

    handleClickCell = (cellId) => {
        if (!this.state.usedCells.includes(cellId)) {
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
        // else {
        //     alert('cell taken')
        // }  
    }

    findFilledCells = () => this.state.cells.filter(c => c.value)

    findTryCells = () => this.findFilledCells().filter(c => this.state.tryTiles.find(t => t.id === c.tileId))

    handleTrySubmit = () => {
        const tryWords = []
        const filledCells = this.findFilledCells()
        const tryCells = this.findTryCells()
        const distinctX = [...new Set(tryCells.map(c => c.x))]
        const distinctY = [...new Set(tryCells.map(c => c.y))]

        this.setState({ errors: [] }, () => {
            // test input length
            if (tryCells.length < 1) {
                const error = { message: "You must place down at least 1 tile." }

                this.setState({
                    errors: this.state.errors.concat(error)
                })

                return
            }

            // test adjancency of tiles in both directions
            if (distinctX.length > 1 && distinctY.length > 1) {
                const error = { message: "New tiles must be placed adjacent to one another in one direction." }

                this.setState({
                    errors: this.state.errors.concat(error)
                })

                return
            }

            // get [x, y] coordinates for first tile placed
            const x = tryCells[0].x
            const y = tryCells[0].y 
            // let colCells, rowCells;

            // const colCells = filledCells.filter(c => c.x === x)
            // const rowCells = filledCells.filter(c => c.y === y)
            // allLetters = colCells.filter(c => c.value).concat(rowCells.filter(c => c.value))
            // console.log('colcells', colCells)
            // console.log('rowcells', rowCells)

            // 1. Determine if word was placed horizontally or vertically
            // 2. If horizontal, scan the row for word & then each column the letters were placed for words
            if (distinctY.length === 1 && distinctX.length > 1) {
                const lastPlacedX = tryCells[tryCells.length - 1].x
                const rowCells = filledCells.filter(cell => cell.y === y)
                let firstLetterIdx = rowCells.indexOf(tryCells[0])
                let lastLetterIdx = rowCells.indexOf(tryCells[tryCells.length - 1])
                let firstTileX = x 
                let lastTileX = lastPlacedX

                // test adjancency of tile in single direction
                const distance = lastPlacedX - x + 10 
                const maxDistance = tryCells.length * 10

                if (distance > maxDistance) {
                    const error = { message: "New tiles must be placed adjacent to one another." }
    
                    this.setState({
                        errors: this.state.errors.concat(error)
                    })
    
                    return
                }

                // get index of start of word (find white space)
                while (firstLetterIdx > 0) {
                    const cellBefore = rowCells[firstLetterIdx - 1]
                    const tileX = cellBefore.x
                    
                    if (firstTileX - tileX > 10) break
                    
                    firstTileX = tileX
                    firstLetterIdx -= 1
                }
                // console.log('first letter idx', firstLetterIdx)
                
                // get index of end of word (find white space)
                while (lastLetterIdx < rowCells.length - 1) {
                    const cellAfter = rowCells[lastLetterIdx + 1]
                    const tileX = cellAfter.x 

                    if (tileX - lastTileX > 10) break 
                    
                    lastTileX = tileX
                    lastLetterIdx += 1
                }
                // console.log('last letter idx', lastLetterIdx)

                const wordCells = rowCells.slice(firstLetterIdx, lastLetterIdx + 1)

                tryCells.forEach(tryCell => {
                    const colCells = filledCells.filter(cell => cell.x === tryCell.x)
                    // if there's more than one letter in that column
                    if (colCells.length > 1) {
                        const tryCellIdx = colCells.indexOf(tryCell)
                        let firstLetterIdx = tryCellIdx 
                        let lastLetterIdx = tryCellIdx
                        let firstTileY = tryCell.y 
                        let lastTileY = tryCell.y
    
                        while (firstLetterIdx > 0) {
                            const cellBefore = colCells[firstLetterIdx - 1]
                            const tileY = cellBefore.y 
                            
                            if (firstTileY - tileY > 10) break 
    
                            firstTileY = tileY
                            firstLetterIdx -= 1
                        }
                        // console.log('first letter', colCells[firstLetterIdx])
    
                        while (lastLetterIdx < colCells.length - 1) {
                            const cellAfter = colCells[lastLetterIdx + 1]
                            const tileY = cellAfter.y 
                            
                            if (tileY - lastTileY > 10) break 
    
                            lastTileY = tileY 
                            lastLetterIdx += 1
                        }

                        if (firstLetterIdx !== lastLetterIdx) {
                            const wordCells = colCells.slice(firstLetterIdx, lastLetterIdx + 1)
                            const tryWord = wordCells.map(cell => cell.value).join('')

                            tryWords.push(tryWord)
                        }
                        // console.log('last letter', colCells[lastLetterIdx])
                        // console.log(colCells, tryCellIdx)
                    } 
                })

                if (tryWords.length > 0 || this.state.usedTiles.length === 0) {
                    const tryWord = wordCells.map(cell => cell.value).join('')
                    tryWords.push(tryWord)
                } else {
                    // 3. Need to also determine adjancency to existing tiles
                    const error = { message: "New tiles must be placed adjacent to existing tiles." }

                    this.setState({
                        errors: this.state.errors.concat(error)
                    })

                    return
                }
            }

            // 2. If vertical, scan each row the letters were placed for words
            if (distinctX.length === 1 && distinctY.length > 1) {
                const lastPlacedY = tryCells[tryCells.length - 1].y
                const colCells = filledCells.filter(cell => cell.x === x)
                let firstLetterIdx = colCells.indexOf(tryCells[0])
                let lastLetterIdx = colCells.indexOf(tryCells[tryCells.length - 1])
                let firstTileY = y 
                let lastTileY = lastPlacedY

                // test adjancency of tile in single direction
                const distance = lastPlacedY - y + 10 
                const maxDistance = tryCells.length * 10

                if (distance > maxDistance) {
                    const error = { message: "New tiles must be placed adjacent to one another." }
    
                    this.setState({
                        errors: this.state.errors.concat(error)
                    })
    
                    return
                }

                // get index of start of word (find white space)
                while (firstLetterIdx > 0) {
                    const cellBefore = colCells[firstLetterIdx - 1]
                    const tileY = cellBefore.Y
                    
                    if (firstTileY - tileY > 10) break
                    
                    firstTileY = tileY
                    firstLetterIdx -= 1
                }
                // console.log('first letter idx', firstLetterIdx)
                
                // get index of end of word (find white space)
                while (lastLetterIdx < colCells.length - 1) {
                    const cellAfter = colCells[lastLetterIdx + 1]
                    const tileY = cellAfter.y

                    if (tileY - lastTileY > 10) break 
                    
                    lastTileY = tileY
                    lastLetterIdx += 1
                }
                // console.log('last letter idx', lastLetterIdx)

                const wordCells = colCells.slice(firstLetterIdx, lastLetterIdx + 1)

                tryCells.forEach(tryCell => {
                    const rowCells = filledCells.filter(cell => cell.y === tryCell.y)
                    // if there's more than one letter in that column
                    if (rowCells.length > 1) {
                        const tryCellIdx = rowCells.indexOf(tryCell)
                        let firstLetterIdx = tryCellIdx 
                        let lastLetterIdx = tryCellIdx
                        let firstTileX = tryCell.x 
                        let lastTileX = tryCell.x
    
                        while (firstLetterIdx > 0) {
                            const cellBefore = rowCells[firstLetterIdx - 1]
                            const tileX = cellBefore.x 

                            if (firstTileX - tileX > 10) break 

                            firstTileX = tileX
                            firstLetterIdx -= 1
                        }
                        // console.log('first letter', rowCells[firstLetterIdx])
    
                        while (lastLetterIdx < rowCells.length - 1) {
                            const cellAfter = rowCells[lastLetterIdx + 1]
                            const tileX = cellAfter.x 
                            
                            if (tileX - lastTileX > 10) break 
    
                            lastTileX = tileX
                            lastLetterIdx += 1
                        }

                        if (firstLetterIdx !== lastLetterIdx) {
                            const wordCells = rowCells.slice(firstLetterIdx, lastLetterIdx + 1)
                            const tryWord = wordCells.map(cell => cell.value).join('')

                            tryWords.push(tryWord)
                        }
                        // console.log('last letter', rowCells[lastLetterIdx])
                        // console.log(colCells, tryCellIdx)
                    } 
                })

                if (tryWords.length > 0 || this.state.usedTiles.length === 0) {
                    const tryWord = wordCells.map(cell => cell.value).join('')
                    tryWords.push(tryWord)
                } else {
                    // 3. Need to also determine adjancency to existing tiles
                    const error = { message: "New tiles must be placed adjacent to existing tiles." }

                    this.setState({
                        errors: this.state.errors.concat(error)
                    })

                    return
                }
            }
            // console.log(tryWords)

            // 2. If only one letter was placed, scan both row and column for words
            if (tryCells.length === 1) {
                // scan row
                const rowCells = filledCells.filter(cell => cell.y === y)
                const tryCellRowIdx = rowCells.indexOf(tryCells[0])
                let firstRowLetterIdx = tryCellRowIdx
                let lastRowLetterIdx = tryCellRowIdx
                let firstRowTileX = tryCells[0].x 
                let lastRowTileX = tryCells[0].x

                while (firstRowLetterIdx > 0) {
                    const cellBefore = rowCells[firstRowLetterIdx - 1]
                    const tileX = cellBefore.x 

                    if (firstRowTileX - tileX > 10) break 

                    firstRowTileX = tileX
                    firstRowLetterIdx -= 1
                }
                // console.log('first letter', rowCells[firstLetterIdx])

                while (lastRowLetterIdx < rowCells.length - 1) {
                    const cellAfter = rowCells[lastRowLetterIdx + 1]
                    const tileX = cellAfter.x 
                    
                    if (tileX - lastRowTileX > 10) break 

                    lastRowTileX = tileX
                    lastRowLetterIdx += 1
                }

                // 3. Need to also determine adjancency to existing tiles
                if (firstRowLetterIdx === lastRowLetterIdx) {
                    const errors = [
                        { message: "Words must be at least 2 letters long." },
                        { message: "New tiles must be placed adjacent to existing tiles." }
                    ]

                    this.setState({
                        errors: this.state.errors.concat(errors)
                    })
    
                    return
                }

                if (firstRowLetterIdx !== lastRowLetterIdx) {
                    const wordCells = rowCells.slice(firstRowLetterIdx, lastRowLetterIdx + 1)
                    const tryWord = wordCells.map(cell => cell.value).join('')

                    tryWords.push(tryWord)
                }


                // scan column
                const colCells = filledCells.filter(cell => cell.x === x)
                const tryCellColIdx = colCells.indexOf(tryCells[0])
                let firstColLetterIdx = tryCellColIdx
                let lastColLetterIdx = tryCellColIdx
                let firstColTileY = tryCells[0].y 
                let lastColTileY = tryCells[0].y

                while (firstColLetterIdx > 0) {
                    const cellBefore = colCells[firstColLetterIdx - 1]
                    const tileY = cellBefore.y 
                    
                    if (firstColTileY - tileY > 10) break 

                    firstColTileY = tileY
                    firstColLetterIdx -= 1
                }
                // console.log('first letter', colCells[firstLetterIdx])

                while (lastColLetterIdx < colCells.length - 1) {
                    const cellAfter = colCells[lastColLetterIdx + 1]
                    const tileY = cellAfter.y 
                    
                    if (tileY - lastColTileY > 10) break 

                    lastColTileY = tileY 
                    lastColLetterIdx += 1
                }

                // 3. Need to also determine adjancency to existing tiles
                if (firstColLetterIdx === lastColLetterIdx) {
                    const errors = [
                        { message: "Words must be at least 2 letters long." },
                        { message: "New tiles must be placed adjacent to existing tiles." }
                    ]

                    this.setState({
                        errors: this.state.errors.concat(errors)
                    })
    
                    return
                }

                if (firstColLetterIdx !== lastColLetterIdx) {
                    const wordCells = colCells.slice(firstColLetterIdx, lastColLetterIdx + 1)
                    const tryWord = wordCells.map(cell => cell.value).join('')

                    tryWords.push(tryWord)
                }
            }
            console.log(tryWords)

            // test length of word
            // if (tryCells.length < 2) {
                // const error = { message: "Words must be at least 2 letters long." }

                // this.setState({
                //     errors: this.state.errors.concat(error)
                // })

                // return
            // }

            // test adjancency of tiles
            // if (tryCells.length > 1 && distinctX.length > 1 && distinctY.length > 1) {
            //     const error = { message: "New tiles must be placed adjacent to one another in one direction." }

            //     this.setState({
            //         errors: this.state.errors.concat(error)
            //     })

            //     return
            // }

            // const firstLetter = tryCells[0]
            // const lastLetter = tryCells[tryCells.length - 1]
            // const maxDistance = tryCells.length * 10
            let firstLetter, lastLetter, maxDistance, distance, allLetters;

            // test vertical word
            // if (tryCells.length > 0 && distinctX.length === 1 && distinctY.length > 1) {
            //     const x = tryCells[0].x
            //     // find first letter - scan row for first instance of filled cell
            //     const colCells = this.state.cells.filter(c => c.x === x)
            //     allLetters = colCells.filter(c => c.value)
            //     firstLetter = allLetters[0]
            //     // find last letter - scan row after first letter for white space
            //     lastLetter = allLetters[allLetters.length - 1]
            //     // calculate max distance of word
            //     maxDistance = allLetters.length * 10
            //     distance = lastLetter.y - firstLetter.y + 10
            // }

            // test horizontal word
            // if (tryCells.length > 0 && distinctY.length === 1 && distinctX.length > 1) {
            //     const y = tryCells[0].y 
            //     const rowCells = this.state.cells.filter(c => c.y === y)
            //     allLetters = rowCells.filter(c => c.value)
            //     firstLetter = allLetters[0]
            //     lastLetter = allLetters[allLetters.length - 1]
            //     maxDistance = allLetters.length * 10
            //     distance = lastLetter.x - firstLetter.x + 10
            // }

            const colCells = this.state.cells.filter(c => c.x === x)
            const rCells = this.state.cells.filter(c => c.y === y)
            allLetters = colCells.filter(c => c.value).concat(rCells.filter(c => c.value))

            // allColLetters = colCells.filter(c => c.value)
            // allRowLetters = rowCells.filter(c => c.value)
            
            firstLetter = allLetters[0]
            // find last letter - scan row after first letter for white space
            lastLetter = allLetters[allLetters.length - 1]
            // calculate max distance of word
            maxDistance = allLetters.length * 10
            distance = lastLetter.y - firstLetter.y + 10
            

            // 1. error check:
            // test adjancency of tile in single direction
            if (distance > maxDistance) {
                const error = { message: "New tiles must be placed adjacent to one another." }

                this.setState({
                    errors: this.state.errors.concat(error)
                })

                return
            }

            // test length of word
            if (colCells.length < 2 && rCells.length < 2) {
                const error = { message: "Words must be at least 2 letters long." }

                this.setState({
                    errors: this.state.errors.concat(error)
                })

                return
            }

            // test adjancency of tiles in both directions
            // if (allLetters.length > 1 && distinctX.length > 1 && distinctY.length > 1) {
            //     const error = { message: "New tiles must be placed adjacent to one another in one direction." }

            //     this.setState({
            //         errors: this.state.errors.concat(error)
            //     })

            //     return
            // }

            // 2. get word
            const word = tryCells.map(cell => cell.value).join('')
            console.log('word', word)
            // 3. test validity 
                // assume anything is valid for now
            // 4. get points
            const points = tryCells.reduce( ((acc, cell) => acc + cell.points), 0)
            console.log('points', points)
            const tryCellIds = tryCells.map(cell => cell.id)
            // 5. add points to user's score
            // 6. add try tiles to used tiles
            // 7. disable cells
            this.setState((prevState) => ({
                points: prevState.points + points,
                tryTiles: [],
                usedTiles: prevState.usedTiles.concat(this.state.tryTiles),
                usedCells: prevState.usedCells.concat(tryCellIds)
            }))

            // 8. create new hand
            const tilesNeeded = tryCells.length
            this.createHand(tilesNeeded)
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

                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5px'}}>
                    <span>Points: { this.state.points }</span>
                </div>

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