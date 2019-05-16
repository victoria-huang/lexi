import React from 'react'

import { connect } from 'react-redux'
import {
    addErrors, 
    clearErrors,
    addPoints,
    clearTryTiles,
    setUsedCells,
    updateUsedTiles,
    resetExchanged,
    deselectTile,
    switchTurn,
    updateCells,
    startGame
} from '../actions'

const Submit = ({
    cells,
    usedCells,
    tryTiles,
    whoseTurn,
    gameStart,
    updateUsedTiles,
    addErrors,
    clearErrors,
    addPoints,
    clearTryTiles,
    setUsedCells,
    resetExchanged,
    deselectTile,
    switchTurn,
    updateCells,
    startGame,
    createHand
}) => {

    const findFilledCells = () => cells.filter(c => c.value)

    const findTryCells = () => findFilledCells().filter(c => tryTiles.find(t => t._id === c.tileId))

    const scanPlacedWord = (direction, firstPlacedPos, lastPlacedPos, tryCells, filledCells) => {           
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
            const error = { message: "new tiles must be placed adjacent to one another." }
    
            return error
        }
    
        return wordCells
    }
    
    const scanBoard = (direction, tryCell, filledCells) => {
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

    const handleTrySubmit = async () => {
        const tryWords = []
        const filledCells = findFilledCells()
        const tryCells = findTryCells()
        const distinctX = [...new Set(tryCells.map(c => c.x))]
        const distinctY = [...new Set(tryCells.map(c => c.y))]
    
        clearErrors()

        // test input length
        if (tryCells.length < 1) {
            const error = { message: "you must place down at least 1 tile." }
            
            addErrors(error)
            
            return
        }

         // test first move input on starting pos 
         if (!gameStart && !tryCells.find(cell => cell.bonus === '✴')) {
            const error = { message: "the first tile must be placed on the ✴ position." }
            
            addErrors(error)
            
            return
        }

        // test adjancency of tiles in both directions
        if (distinctX.length > 1 && distinctY.length > 1) {
            const error = { message: "new tiles must be placed adjacent to one another in one direction." }
            
            addErrors(error)
            
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
            
            const result = scanPlacedWord('x', firstPlacedX, lastPlacedX, tryCells, rowCells)

            if (Array.isArray(result)) {
                wordCells = result
            } else {
                addErrors(result)
                
                return
            }

            tryCells.forEach(tryCell => {
                const colCells = filledCells.filter(cell => cell.x === tryCell.x)
                // if there's more than one letter in that column
                if (colCells.length > 1) {
                    const tryCellResult = scanBoard('y', tryCell, colCells)

                    if (tryCellResult) tryWords.push(tryCellResult)
                } 
            })

            if (tryWords.length < 1) {
                if (usedCells.length === 0 || wordCells.length > tryCells.length) {
                    tryWords.push(wordCells)
                } else {
                    // 3. Need to also determine adjancency to existing tiles
                    const error = { message: "new tiles must be placed adjacent to existing tiles." }

                    addErrors(error)

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

            const result = scanPlacedWord('y', firstPlacedY, lastPlacedY, tryCells, colCells)

            if (Array.isArray(result)) {
                wordCells = result
            } else {
                addErrors(result)
                
                return
            }

            tryCells.forEach(tryCell => {
                const rowCells = filledCells.filter(cell => cell.y === tryCell.y)
                // if there's more than one letter in that row
                if (rowCells.length > 1) {
                    const tryCellResult = scanBoard('x', tryCell, rowCells)

                    if (tryCellResult) tryWords.push(tryCellResult)
                } 
            })

            if (tryWords.length < 1) {
                if (usedCells.length === 0 || wordCells.length > tryCells.length) {
                    tryWords.push(wordCells)
                } else {
                    // 3. Need to also determine adjancency to existing tiles
                    const error = { message: "new tiles must be placed adjacent to existing tiles." }

                    addErrors(error)

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

                if (usedCells.length > 0) {
                    errors = [
                        { message: "words must be at least 2 letters long." },
                        { message: "new tiles must be placed adjacent to existing tiles." }
                    ]
                } else {
                    errors = [
                        { message: "words must be at least 2 letters long." },
                    ]
                }

                addErrors(errors)

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

        const wordErrors = []
        
        // 2. loop through tryWords 
        let testWordCells = await Promise.all(tryWords.map(async (wordCells) => {
            // 3. test validity
            const tryWord = wordCells.map(cell => cell.value).join('')
            const result = await testWord(tryWord)

            if (!result) wordErrors.push({ message: `${tryWord} is not a valid word.`})
            else 
                return wordCells.map(cell => {
                    // only add unique words to cell
                    if (cell.words.find(w => w.word === result.word)) return cell
                    else return { ...cell, words: [...cell.words, result] }
                })
        }))
        
        if (wordErrors.length > 0) {
            addErrors(wordErrors)
            return
        }

        testWordCells = [].concat.apply([], testWordCells);

        let pointTotal = 0

        tryWords.forEach(wordCells => {
            // 4. get points
            let wordMultiplier = 1

            const points = wordCells.reduce( ((acc, cell) => {
                let letterMultiplier = 1

                switch(cell.bonus) {
                    case 'DL':
                        letterMultiplier = 2
                        break
                    case 'DW':
                        wordMultiplier = 2
                        break
                    case 'TL':
                        letterMultiplier = 3
                        break
                    case 'TW': 
                        wordMultiplier = 3
                        break
                    default:
                        break
                } 
                
                return acc + (cell.points * letterMultiplier)
            }), 0)
            // 5. add points to user's score
            pointTotal += (points * wordMultiplier)
        })

        addPoints(pointTotal)
        // console.log(tryWords)
        // console.log('points', pointTotal)

        // 6. add try tiles to used tiles & try cells to used cells
        clearTryTiles()
        
        // 7. disable cells & bonuses
        const newCells = [...cells].map(cell => {
            const cellWithNewWords = testWordCells.find(wc => wc._id === cell._id)
            if (cellWithNewWords) return { ...cellWithNewWords, bonus: null }
            else return cell
        })

        updateCells(newCells)

        const tryCellIds = tryCells.map(cell => cell._id)
        
        setUsedCells(tryCellIds)
        updateUsedTiles(tryTiles)

        // 8. create new hand
        const tilesNeeded = tryCells.length
        createHand(tilesNeeded, whoseTurn)
        resetExchanged()
        deselectTile()

        if (!gameStart) startGame()
        // 9. switch turn
        switchTurn()
    }

    const testWord = (word) => {
        return fetch(`https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}`) 
        .then(resp => resp.json())
        .catch(err => console.log(err))
    }

    return (
        <button onClick={ handleTrySubmit }>submit</button>
    )
}

const mapStateToProps = (state) => ({
    cells: state.cell.allCells,
    usedCells: state.cell.usedCells,
    tryTiles: state.tile.tryTiles,
    whoseTurn: state.game.whoseTurn,
    gameStart: state.game.gameStart
})

const mapDispatchToProps = (dispatch) => ({
    updateUsedTiles: (tiles) => dispatch(updateUsedTiles(tiles)),
    addErrors: (error) => dispatch(addErrors(error)),
    clearErrors: () => dispatch(clearErrors()),
    addPoints: (points) => dispatch(addPoints(points)),
    clearTryTiles: () => dispatch(clearTryTiles()),
    setUsedCells: (cellIds) => dispatch(setUsedCells(cellIds)),
    resetExchanged: () => dispatch(resetExchanged()),
    deselectTile: () => dispatch(deselectTile()),
    switchTurn: () => dispatch(switchTurn()),
    updateCells: (cells) => dispatch(updateCells(cells)),
    startGame: () => dispatch(startGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(Submit)