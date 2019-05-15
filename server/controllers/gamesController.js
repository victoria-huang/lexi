const Game = require('../models/game')
const Tile = Game.tile 
const Tiles = Game.tiles 
const Cell = Game.cell
const Cells = Game.cells

const gameActions = require('./gameActions')
const tileActions = require('./tileActions')
const cellActions = require('./cellActions')

const ALL_TILES = [
    { letter: 'a', points: 1 },
    { letter: 'a', points: 1 },
    { letter: 'a', points: 1 },
    { letter: 'a', points: 1 },
    { letter: 'a', points: 1 },
    { letter: 'a', points: 1 },
    { letter: 'a', points: 1 },
    { letter: 'a', points: 1 },
    { letter: 'a', points: 1 },
    { letter: 'b', points: 3 },
    { letter: 'b', points: 3 },
    { letter: 'c', points: 3 },
    { letter: 'c', points: 3 },
    { letter: 'd', points: 2 },
    { letter: 'd', points: 2 },
    { letter: 'd', points: 2 },
    { letter: 'd', points: 2 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'e', points: 1 },
    { letter: 'f', points: 4 },
    { letter: 'f', points: 4 },
    { letter: 'g', points: 2 },
    { letter: 'g', points: 2 },
    { letter: 'g', points: 2 },
    { letter: 'h', points: 4 },
    { letter: 'h', points: 4 },
    { letter: 'i', points: 1 },
    { letter: 'i', points: 1 },
    { letter: 'i', points: 1 },
    { letter: 'i', points: 1 },
    { letter: 'i', points: 1 },
    { letter: 'i', points: 1 },
    { letter: 'i', points: 1 },
    { letter: 'i', points: 1 },
    { letter: 'i', points: 1 },
    { letter: 'j', points: 8 },
    { letter: 'k', points: 5 },
    { letter: 'l', points: 1 },
    { letter: 'l', points: 1 },
    { letter: 'l', points: 1 },
    { letter: 'l', points: 1 },
    { letter: 'm', points: 3 },
    { letter: 'm', points: 3 },
    { letter: 'n', points: 1 },
    { letter: 'n', points: 1 },
    { letter: 'n', points: 1 },
    { letter: 'n', points: 1 },
    { letter: 'n', points: 1 },
    { letter: 'n', points: 1 },
    { letter: 'o', points: 1 },
    { letter: 'o', points: 1 },
    { letter: 'o', points: 1 },
    { letter: 'o', points: 1 },
    { letter: 'o', points: 1 },
    { letter: 'o', points: 1 },
    { letter: 'o', points: 1 },
    { letter: 'o', points: 1 },
    { letter: 'p', points: 3 },
    { letter: 'p', points: 3 },
    { letter: 'q', points: 10 },
    { letter: 'r', points: 1 },
    { letter: 'r', points: 1 },
    { letter: 'r', points: 1 },
    { letter: 'r', points: 1 },
    { letter: 'r', points: 1 },
    { letter: 'r', points: 1 },
    { letter: 's', points: 1 },
    { letter: 's', points: 1 },
    { letter: 's', points: 1 },
    { letter: 's', points: 1 },
    { letter: 't', points: 1 },
    { letter: 't', points: 1 },
    { letter: 't', points: 1 },
    { letter: 't', points: 1 },
    { letter: 't', points: 1 },
    { letter: 't', points: 1 },
    { letter: 'u', points: 1 },
    { letter: 'u', points: 1 },
    { letter: 'u', points: 1 },
    { letter: 'u', points: 1 },
    { letter: 'v', points: 4 },
    { letter: 'v', points: 4 },
    { letter: 'w', points: 4 },
    { letter: 'w', points: 4 },
    { letter: 'x', points: 8 },
    { letter: 'y', points: 4 },
    { letter: 'y', points: 4 },
    { letter: 'z', points: 10 },
    { letter: ' ', points: 0 },
    { letter: ' ', points: 0 }
]

const ALL_CELLS = [
    { x: 0, y: 0, bonus: 'TW', words: [] },
    { x: 0, y: 10, words: [] },
    { x: 0, y: 20, words: [] },
    { x: 0, y: 30, bonus: 'DL', words: [] },
    { x: 0, y: 40, words: [] },
    { x: 0, y: 50, words: [] },
    { x: 0, y: 60, words: [] },
    { x: 0, y: 70, bonus: 'TW', words: [] },
    { x: 0, y: 80, words: [] },
    { x: 0, y: 90, words: [] },
    { x: 0, y: 100, words: [] },
    { x: 0, y: 110, bonus: 'DL', words: [] },
    { x: 0, y: 120, words: [] },
    { x: 0, y: 130, words: [] },
    { x: 0, y: 140, bonus: 'TW', words: [] },
    { x: 10, y: 0, words: [] },
    { x: 10, y: 10, bonus: 'DW', words: [] },
    { x: 10, y: 20, words: [] },
    { x: 10, y: 30, words: [] },
    { x: 10, y: 40, words: [] },
    { x: 10, y: 50, bonus: 'TL', words: [] },
    { x: 10, y: 60, words: [] },
    { x: 10, y: 70, words: [] },
    { x: 10, y: 80, words: [] },
    { x: 10, y: 90, bonus: 'TL', words: [] },
    { x: 10, y: 100, words: [] },
    { x: 10, y: 110, words: [] },
    { x: 10, y: 120, words: [] },
    { x: 10, y: 130, bonus: 'DW', words: [] },
    { x: 10, y: 140, words: [] },
    { x: 20, y: 0, words: [] },
    { x: 20, y: 10, words: [] },
    { x: 20, y: 20, bonus: 'DW', words: [] },
    { x: 20, y: 30, words: [] },
    { x: 20, y: 40, words: [] },
    { x: 20, y: 50, words: [] },
    { x: 20, y: 60, bonus: 'DL', words: [] },
    { x: 20, y: 70, words: [] },
    { x: 20, y: 80, bonus: 'DL', words: [] },
    { x: 20, y: 90, words: [] },
    { x: 20, y: 100, words: [] },
    { x: 20, y: 110, words: [] },
    { x: 20, y: 120, bonus: 'DW', words: [] },
    { x: 20, y: 130, words: [] },
    { x: 20, y: 140, words: [] },
    { x: 30, y: 0, bonus: 'DL', words: [] },
    { x: 30, y: 10, words: [] },
    { x: 30, y: 20, words: [] },
    { x: 30, y: 30, bonus: 'DW', words: [] },
    { x: 30, y: 40, words: [] },
    { x: 30, y: 50, words: [] },
    { x: 30, y: 60, words: [] },
    { x: 30, y: 70, bonus: 'DL', words: [] },
    { x: 30, y: 80, words: [] },
    { x: 30, y: 90, words: [] },
    { x: 30, y: 100, words: [] },
    { x: 30, y: 110, bonus: 'DW', words: [] },
    { x: 30, y: 120, words: [] },
    { x: 30, y: 130, words: [] },
    { x: 30, y: 140, bonus: 'DL', words: [] },
    { x: 40, y: 0, words: [] },
    { x: 40, y: 10, words: [] },
    { x: 40, y: 20, words: [] },
    { x: 40, y: 30, words: [] },
    { x: 40, y: 40, bonus: 'DW', words: [] },
    { x: 40, y: 50, words: [] },
    { x: 40, y: 60, words: [] },
    { x: 40, y: 70, words: [] },
    { x: 40, y: 80, words: [] },
    { x: 40, y: 90, words: [] },
    { x: 40, y: 100, bonus: 'DW', words: [] },
    { x: 40, y: 110, words: [] },
    { x: 40, y: 120, words: [] },
    { x: 40, y: 130, words: [] },
    { x: 40, y: 140, words: [] },
    { x: 50, y: 0, words: [] },
    { x: 50, y: 10, bonus: 'TL', words: [] },
    { x: 50, y: 20, words: [] },
    { x: 50, y: 30, words: [] },
    { x: 50, y: 40, words: [] },
    { x: 50, y: 50, bonus: 'TL', words: [] },
    { x: 50, y: 60, words: [] },
    { x: 50, y: 70, words: [] },
    { x: 50, y: 80, words: [] },
    { x: 50, y: 90, bonus: 'TL', words: [] },
    { x: 50, y: 100, words: [] },
    { x: 50, y: 110, words: [] },
    { x: 50, y: 120, words: [] },
    { x: 50, y: 130, bonus: 'TL', words: [] },
    { x: 50, y: 140, words: [] },
    { x: 60, y: 0, words: [] },
    { x: 60, y: 10, words: [] },
    { x: 60, y: 20, bonus: 'DL', words: [] },
    { x: 60, y: 30, words: [] },
    { x: 60, y: 40, words: [] },
    { x: 60, y: 50, words: [] },
    { x: 60, y: 60, bonus: 'DL', words: [] },
    { x: 60, y: 70, words: [] },
    { x: 60, y: 80, bonus: 'DL', words: [] },
    { x: 60, y: 90, words: [] },
    { x: 60, y: 100, words: [] },
    { x: 60, y: 110, words: [] },
    { x: 60, y: 120, bonus: 'DL', words: [] },
    { x: 60, y: 130, words: [] },
    { x: 60, y: 140, words: [] },
    { x: 70, y: 0, bonus: 'TW', words: [] },
    { x: 70, y: 10, words: [] },
    { x: 70, y: 20, words: [] },
    { x: 70, y: 30, bonus: 'DL', words: [] },
    { x: 70, y: 40, words: [] },
    { x: 70, y: 50, words: [] },
    { x: 70, y: 60, words: [] },
    { x: 70, y: 70, bonus: '✴', words: [] },
    { x: 70, y: 80, words: [] },
    { x: 70, y: 90, words: [] },
    { x: 70, y: 100, words: [] },
    { x: 70, y: 110, bonus: 'DL', words: [] },
    { x: 70, y: 120, words: [] },
    { x: 70, y: 130, words: [] },
    { x: 70, y: 140, bonus: 'TW', words: [] },
    { x: 80, y: 0, words: [] },
    { x: 80, y: 10, words: [] },
    { x: 80, y: 20, bonus: 'DL', words: [] },
    { x: 80, y: 30, words: [] },
    { x: 80, y: 40, words: [] },
    { x: 80, y: 50, words: [] },
    { x: 80, y: 60, bonus: 'DL', words: [] },
    { x: 80, y: 70, words: [] },
    { x: 80, y: 80, bonus: 'DL', words: [] },
    { x: 80, y: 90, words: [] },
    { x: 80, y: 100, words: [] },
    { x: 80, y: 110, words: [] },
    { x: 80, y: 120, bonus: 'DL', words: [] },
    { x: 80, y: 130, words: [] },
    { x: 80, y: 140, words: [] },
    { x: 90, y: 0, words: [] },
    { x: 90, y: 10, bonus: 'TL', words: [] },
    { x: 90, y: 20, words: [] },
    { x: 90, y: 30, words: [] },
    { x: 90, y: 40, words: [] },
    { x: 90, y: 50, bonus: 'TL', words: [] },
    { x: 90, y: 60, words: [] },
    { x: 90, y: 70, words: [] },
    { x: 90, y: 80, words: [] },
    { x: 90, y: 90, bonus: 'TL', words: [] },
    { x: 90, y: 100, words: [] },
    { x: 90, y: 110, words: [] },
    { x: 90, y: 120, words: [] },
    { x: 90, y: 130, bonus: 'TL', words: [] },
    { x: 90, y: 140, words: [] },
    { x: 100, y: 0, words: [] },
    { x: 100, y: 10, words: [] },
    { x: 100, y: 20, words: [] },
    { x: 100, y: 30, words: [] },
    { x: 100, y: 40, bonus: 'DW', words: [] },
    { x: 100, y: 50, words: [] },
    { x: 100, y: 60, words: [] },
    { x: 100, y: 70, words: [] },
    { x: 100, y: 80, words: [] },
    { x: 100, y: 90, words: [] },
    { x: 100, y: 100, bonus: 'DW', words: [] },
    { x: 100, y: 110, words: [] },
    { x: 100, y: 120, words: [] },
    { x: 100, y: 130, words: [] },
    { x: 100, y: 140, words: [] },
    { x: 110, y: 0, bonus: 'DL', words: [] },
    { x: 110, y: 10, words: [] },
    { x: 110, y: 20, words: [] },
    { x: 110, y: 30, bonus: 'DW', words: [] },
    { x: 110, y: 40, words: [] },
    { x: 110, y: 50, words: [] },
    { x: 110, y: 60, words: [] },
    { x: 110, y: 70, bonus: 'DL', words: [] },
    { x: 110, y: 80, words: [] },
    { x: 110, y: 90, words: [] },
    { x: 110, y: 100, words: [] },
    { x: 110, y: 110, bonus: 'DW', words: [] },
    { x: 110, y: 120, words: [] },
    { x: 110, y: 130, words: [] },
    { x: 110, y: 140, bonus: 'DL', words: [] },
    { x: 120, y: 0, words: [] },
    { x: 120, y: 10, words: [] },
    { x: 120, y: 20, bonus: 'DW', words: [] },
    { x: 120, y: 30, words: [] },
    { x: 120, y: 40, words: [] },
    { x: 120, y: 50, words: [] },
    { x: 120, y: 60, bonus: 'DL', words: [] },
    { x: 120, y: 70, words: [] },
    { x: 120, y: 80, bonus: 'DL', words: [] },
    { x: 120, y: 90, words: [] },
    { x: 120, y: 100, words: [] },
    { x: 120, y: 110, words: [] },
    { x: 120, y: 120, bonus: 'DW', words: [] },
    { x: 120, y: 130, words: [] },
    { x: 120, y: 140, words: [] },
    { x: 130, y: 0, words: [] },
    { x: 130, y: 10, bonus: 'DW', words: [] },
    { x: 130, y: 20, words: [] },
    { x: 130, y: 30, words: [] },
    { x: 130, y: 40, words: [] },
    { x: 130, y: 50, bonus: 'TL', words: [] },
    { x: 130, y: 60, words: [] },
    { x: 130, y: 70, words: [] },
    { x: 130, y: 80, words: [] },
    { x: 130, y: 90, bonus: 'TL', words: [] },
    { x: 130, y: 100, words: [] },
    { x: 130, y: 110, words: [] },
    { x: 130, y: 120, words: [] },
    { x: 130, y: 130, bonus: 'DW', words: [] },
    { x: 130, y: 140, words: [] },
    { x: 140, y: 0, bonus: 'TW', words: [] },
    { x: 140, y: 10, words: [] },
    { x: 140, y: 20, words: [] },
    { x: 140, y: 30, bonus: 'DL', words: [] },
    { x: 140, y: 40, words: [] },
    { x: 140, y: 50, words: [] },
    { x: 140, y: 60, words: [] },
    { x: 140, y: 70, bonus: 'TW', words: [] },
    { x: 140, y: 80, words: [] },
    { x: 140, y: 90, words: [] },
    { x: 140, y: 100, words: [] },
    { x: 140, y: 110, bonus: 'DL', words: [] },
    { x: 140, y: 120, words: [] },
    { x: 140, y: 130, words: [] },
    { x: 140, y: 140, bonus: 'TW', words: [] }
]

const currentUser = User.currentUser

exports.index = function (req, res) {
    Game.get(function (err, games) {
        if (err) return res.json({ status: 'error', message: err })

        res.json({
            status: 'success',
            message: 'games retrieved!',
            data: games
        })
    })
}

exports.view = function (req, res) {
    Game.findById(req.params.game_id, function (err, game) {
        if (err) return res.json({ status: 'error', message: err })

        // check to make sure only one of the players in the game is making requests
        if (!currentUser(req).id === game.playerOne && !currentUser(req).id === game.playerTwo)
            return res.status(401).send('unauthorized')

        res.json({
            message: 'game details retrieved!',
            data: game
        })
    })
}

exports.new = function (req, res) {
    const newGame = new Game({
        playerOne: req.body.playerOne,
        playerTwo: req.body.playerTwo,
        p1Name: req.body.p1Name,
        p2Name: req.body.p2Name,
    })

    newGame.tiles = new Tiles
    newGame.cells = new Cells

    ALL_TILES.forEach(tile => {
        const newTile = new Tile({
            letter: tile.letter,
            points: tile.points 
        })

        newGame.tiles.unusedTiles.push(newTile)
    })

    ALL_CELLS.forEach(cell => {
        const newCell = new Cell({
            x: cell.x,
            y: cell.y, 
            bonus: cell.bonus
        })

        newGame.cells.allCells.push(newCell)
    })

    newGame.save()
    .then(game => res.json({
        status: 'success',
        message: 'new game created',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

exports.update = function (req, res) {
    Game.findById(req.params.game_id, function (err, game) {
        if (err) return res.json({ status: 'error', message: err })

        let playerId 

        if (game.whoseTurn === 1) playerId = game.playerOne 
        else playerId = game.playerTwo

        // make sure only the player whose turn it is in the game is making requests
        if (currentUser(req).id !== playerId.toString())
            return res.status(401).send('unauthorized')
        
        switch (req.body.actionType) {
            case 'START_GAME':
                return gameActions.startGame(res, game)
            case 'END_GAME':
                return gameActions.endGame(res, game)
            case 'ADD_POINTS':
                return gameActions.addPoints(res, game, req.body.points)
            case 'SET_EXCHANGED':
                return gameActions.setExchanged(res, game)
            case 'RESET_EXCHANGED':
                return gameActions.resetExchanged(res, game)
            case 'SWITCH_TURN':
                return gameActions.switchTurn(res, game)
            case 'DEAL_FIRST_HAND':
                return gameActions.dealFirstHand(res, game)
            case 'SELECT_TILE':
                return tileActions.selectTile(res, game, req.body.selected)
            case 'DESELECT_TILE':
                return tileActions.deselectTile(res, game)
            case 'ADD_TO_HAND':
                return tileActions.addToHand(res, game, req.body.tile)
            case 'REMOVE_FROM_HAND':
                return tileActions.removeFromHand(res, game, req.body.tile)
            case 'ADD_TRY_TILE':
                return tileActions.addTryTile(res, game, req.body.tile)
            case 'REMOVE_TRY_TILE':
                return tileActions.removeTryTile(res, game, req.body.tile)
            case 'CLEAR_TRY_TILES':
                return tileActions.clearTryTiles(res, game)
            case 'DEAL_PLAYER_TILES':
                return tileActions.dealPlayerTiles(res, game, req.body.tiles, req.body.player)
            case 'UPDATE_UNUSED_TILES':
                return tileActions.updateUnusedTiles(res, game, req.body.tiles)
            case 'UPDATE_USED_TILES':
                return tileActions.updateUsedTiles(res, game, req.body.tiles)
            case 'SHUFFLE_PLAYER_TILES':
                return tileActions.shufflePlayerTiles(res, game, req.body.tiles)
            case 'UPDATE_CELLS':
                return cellActions.updateCells(res, game, req.body.cells)
            case 'SET_USED_CELLS':
                return cellActions.setUsedCells(res, game, req.body.cellIds)
            default:
                return res.json({ status: 'error', message: 'request must supply action type' })
        }
    })
}