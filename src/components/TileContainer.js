import React, { Component } from 'react'
import v4 from 'uuid'

import { connect } from 'react-redux'
import { 
    dealPlayerTiles,
    updateUnusedTiles,
    addErrors, 
    clearErrors,
    addPoints,
    clearTryTiles,
    setUsedCells,
    updateUsedTiles
} from '../actions'

import Tile from './Tile'

class TileContainer extends Component {
    componentDidMount() {
        this.createHand(7)
    }

    createHand(num) {
        if (this.props.unusedTiles.length >= num) {
            let playerTiles = []
            let unusedTiles = [...this.props.unusedTiles]
    
            for (let i = 0; i < num; i++) {
                const max = unusedTiles.length - 1
                const min = 0
                const randomIndex = Math.floor(Math.random() * (max - min) + min)
                const foundTile = unusedTiles[randomIndex]
                playerTiles.push(foundTile)
                unusedTiles = unusedTiles.filter(t => t !== foundTile)
            }

            this.props.updateUnusedTiles(unusedTiles)
            this.props.dealPlayerTiles(playerTiles)
        }  
    }

    findFilledCells = () => this.props.cells.filter(c => c.value)

    findTryCells = () => this.findFilledCells().filter(c => this.props.tryTiles.find(t => t.id === c.tileId))

    scanPlacedWord = (direction, firstPlacedPos, lastPlacedPos, tryCells, filledCells) => {           
        let firstLetterIdx = filledCells.indexOf(tryCells[0])
        let lastLetterIdx = filledCells.indexOf(tryCells[tryCells.length - 1])
        let firstTilePos = firstPlacedPos
        let lastTilePos = lastPlacedPos
    
        // get index of start of word (find white space)
        while (firstLetterIdx > 0) {
            const cellBefore = filledCells[firstLetterIdx - 1]
            const tilePos = cellBefore[direction]
            
            if (firstTilePos - tilePos > 10) break
            
            firstTilePos = tilePos
            firstLetterIdx -= 1
        }
    
        // get index of end of word (find white space)
        while (lastLetterIdx < filledCells.length - 1) {
            const cellAfter = filledCells[lastLetterIdx + 1]
            const tilePos = cellAfter[direction] 
    
            if (tilePos - lastTilePos > 10) break 
            
            lastTilePos = tilePos
            lastLetterIdx += 1
        }
    
        const wordCells = filledCells.slice(firstLetterIdx, lastLetterIdx + 1)
    
        // test adjancency of tile in single direction
        const distance = lastTilePos - firstTilePos + 10 
        const maxDistance = wordCells.length * 10
    
        if (distance > maxDistance) {
            const error = { message: "New tiles must be placed adjacent to one another." }
    
            return error
        }
    
        return wordCells
    }
    
    scanBoard = (direction, tryCell, filledCells) => {
        const tryCellIdx = filledCells.indexOf(tryCell)
        let firstLetterIdx = tryCellIdx 
        let lastLetterIdx = tryCellIdx
        let firstTilePos = tryCell[direction]
        let lastTilePos = tryCell[direction]
    
        while (firstLetterIdx > 0) {
            const cellBefore = filledCells[firstLetterIdx - 1]
            const tilePos = cellBefore[direction] 
            
            if (firstTilePos - tilePos > 10) break 
    
            firstTilePos = tilePos
            firstLetterIdx -= 1
        }
    
        while (lastLetterIdx < filledCells.length - 1) {
            const cellAfter = filledCells[lastLetterIdx + 1]
            const tilePos = cellAfter[direction]
            
            if (tilePos - lastTilePos > 10) break 
    
            lastTilePos = tilePos 
            lastLetterIdx += 1
        }
    
        if (firstLetterIdx !== lastLetterIdx) {
            const wordCells = filledCells.slice(firstLetterIdx, lastLetterIdx + 1)
            
            return wordCells
        }
    
        return null
    }

    handleTrySubmit = () => {
        const tryWords = []
        const filledCells = this.findFilledCells()
        const tryCells = this.findTryCells()
        const distinctX = [...new Set(tryCells.map(c => c.x))]
        const distinctY = [...new Set(tryCells.map(c => c.y))]
    
        this.props.clearErrors()

        // test input length
        if (tryCells.length < 1) {
            const error = { message: "You must place down at least 1 tile." }
            
            this.props.addErrors(error)
            
            return
        }

        // test adjancency of tiles in both directions
        if (distinctX.length > 1 && distinctY.length > 1) {
            const error = { message: "New tiles must be placed adjacent to one another in one direction." }
            
            this.props.addErrors(error)
            
            return
        }

        // get [x, y] coordinates for first tile placed
        const firstPlacedX = tryCells[0].x
        const firstPlacedY = tryCells[0].y 
        let wordCells;

        // 1. Determine if word was placed horizontally or vertically
        // 2. If horizontal, scan the row for word & then each column the letters were placed for words
        if (distinctY.length === 1 && distinctX.length > 1) {
            const lastPlacedX = tryCells[tryCells.length - 1].x
            const rowCells = filledCells.filter(cell => cell.y === firstPlacedY)
            
            const result = this.scanPlacedWord('x', firstPlacedX, lastPlacedX, tryCells, rowCells)

            if (Array.isArray(result)) {
                wordCells = result
            } else {
                this.props.addErrors(result)
                
                return
            }

            tryCells.forEach(tryCell => {
                const colCells = filledCells.filter(cell => cell.x === tryCell.x)
                // if there's more than one letter in that column
                if (colCells.length > 1) {
                    const tryCellResult = this.scanBoard('y', tryCell, colCells)

                    if (tryCellResult) tryWords.push(tryCellResult)
                } 
            })

            if (tryWords.length < 1) {
                if (this.props.usedCells.length === 0 || wordCells.length > tryCells.length) {
                    tryWords.push(wordCells)
                } else {
                    // 3. Need to also determine adjancency to existing tiles
                    const error = { message: "New tiles must be placed adjacent to existing tiles." }

                    this.props.addErrors(error)

                    return
                }
            } else {
                tryWords.push(wordCells)
            }
        }

        // 2. If vertical, scan each row the letters were placed for words
        if (distinctX.length === 1 && distinctY.length > 1) {
            const lastPlacedY = tryCells[tryCells.length - 1].y
            const colCells = filledCells.filter(cell => cell.x === firstPlacedX)

            const result = this.scanPlacedWord('y', firstPlacedY, lastPlacedY, tryCells, colCells)

            if (Array.isArray(result)) {
                wordCells = result
            } else {
                this.props.addErrors(result)
                
                return
            }

            tryCells.forEach(tryCell => {
                const rowCells = filledCells.filter(cell => cell.y === tryCell.y)
                // if there's more than one letter in that row
                if (rowCells.length > 1) {
                    const tryCellResult = this.scanBoard('x', tryCell, rowCells)

                    if (tryCellResult) tryWords.push(tryCellResult)
                } 
            })

            if (tryWords.length < 1) {
                if (this.props.usedCells.length === 0 || wordCells.length > tryCells.length) {
                    tryWords.push(wordCells)
                } else {
                    // 3. Need to also determine adjancency to existing tiles
                    const error = { message: "New tiles must be placed adjacent to existing tiles." }

                    this.props.addErrors(error)

                    return
                }
            } else {
                tryWords.push(wordCells)
            }
        }

        // 2. If only one letter was placed, scan both row and column for words
        if (tryCells.length === 1) {
            // scan row
            const rowCells = filledCells.filter(cell => cell.y === firstPlacedY)
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

            while (lastRowLetterIdx < rowCells.length - 1) {
                const cellAfter = rowCells[lastRowLetterIdx + 1]
                const tileX = cellAfter.x 
                
                if (tileX - lastRowTileX > 10) break 

                lastRowTileX = tileX
                lastRowLetterIdx += 1
            }

            // scan column
            const colCells = filledCells.filter(cell => cell.x === firstPlacedX)
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

            while (lastColLetterIdx < colCells.length - 1) {
                const cellAfter = colCells[lastColLetterIdx + 1]
                const tileY = cellAfter.y 
                
                if (tileY - lastColTileY > 10) break 

                lastColTileY = tileY 
                lastColLetterIdx += 1
            }

            // 3. Need to also determine adjancency to existing tiles
            if (firstColLetterIdx === lastColLetterIdx && firstRowLetterIdx === lastRowLetterIdx) {
                let errors

                if (this.props.usedCells.length > 0) {
                    errors = [
                        { message: "Words must be at least 2 letters long." },
                        { message: "New tiles must be placed adjacent to existing tiles." }
                    ]
                } else {
                    errors = [
                        { message: "Words must be at least 2 letters long." },
                    ]
                }

                this.props.addErrors(errors)

                return
            }

            if (firstColLetterIdx !== lastColLetterIdx) {
                const wordCells = colCells.slice(firstColLetterIdx, lastColLetterIdx + 1)
                tryWords.push(wordCells)
            }

            if (firstRowLetterIdx !== lastRowLetterIdx) {
                const wordCells = rowCells.slice(firstRowLetterIdx, lastRowLetterIdx + 1)
                tryWords.push(wordCells)
            }
        }

        let pointTotal = 0
        // 2. loop through tryWords 
        tryWords.forEach(wordCells => {
            // 3. test validity
                // const tryWord = wordCells.map(cell => cell.value).join('')
                // assume anything is valid for now
            // 4. get points
            const points = wordCells.reduce( ((acc, cell) => acc + cell.points), 0)
            // 5. add points to user's score
            pointTotal += points
        })
        
        this.props.addPoints(pointTotal)
        // console.log(tryWords)
        // console.log('points', pointTotal)

        // 6. add try tiles to used tiles & try cells to used cells
        this.props.clearTryTiles()
        
        // 7. disable cells
        const tryCellIds = tryCells.map(cell => cell.id)
        
        this.props.setUsedCells(tryCellIds)
        this.props.updateUsedTiles(this.props.tryTiles)

        // 8. create new hand
        const tilesNeeded = tryCells.length
        this.createHand(tilesNeeded)
    }

    renderPlayerTiles = () => this.props.playerTiles.map( t => <Tile key={ v4() } { ...t } /> )

    render() {
        return (
            <>
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                { this.props.playerTiles.length > 0 && this.renderPlayerTiles() }
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={ this.handleTrySubmit }>submit</button>
                <button>pass</button>
                <button>exchange</button>
                <button>shuffle</button>
            </div>
            </>
        )
    }
}  

const mapStateToProps = (state) => ({
    cells: state.cell.allCells,
    usedCells: state.cell.usedCells,
    unusedTiles: state.tile.unusedTiles,
    tryTiles: state.tile.tryTiles, 
    playerTiles: state.tile.playerTiles,
    usedTiles: state.tile.usedTiles
})

const mapDispatchToProps = (dispatch) => ({
    dealPlayerTiles: (tiles) => dispatch(dealPlayerTiles(tiles)),
    updateUnusedTiles: (tiles) => dispatch(updateUnusedTiles(tiles)),
    updateUsedTiles: (tiles) => dispatch(updateUsedTiles(tiles)),
    addErrors: (error) => dispatch(addErrors(error)),
    clearErrors: () => dispatch(clearErrors()),
    addPoints: (points) => dispatch(addPoints(points)),
    clearTryTiles: () => dispatch(clearTryTiles()),
    setUsedCells: (cellIds) => dispatch(setUsedCells(cellIds)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TileContainer)