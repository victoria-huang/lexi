module.exports.selectTile = function (res, game, selected) {
    game.tiles.selected = selected 

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'set selected tile',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.deselectTile = function (res, game) { 
    game.tiles.selected = null

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'deselected tile',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.addToHand = function (res, game, tile) {
    
    game.tiles.playerTiles.push(tile)

    if (game.whoseTurn === 1) {
        game.tiles.p1Tiles.push(tile.id)
    } else {
        game.tiles.p2Tiles.push(tile.id)
    }

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `add tile to player ${game.whoseTurn}'s hand`,
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.removeFromHand = function (res, game, tile) {
    game.tiles.playerTiles = game.playerTiles.filter(pt => pt.id !== tile.id)

    if (game.whoseTurn === 1) {
        game.p1Tiles = game.p1Tiles.filter(tileId => tileId !== tile.id)
    } else {
        game.p2Tiles = game.p2Tiles.filter(tileId => tileId !== tile.id)
    }

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `removed tile from player ${game.whoseTurn}'s hand`,
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.addTryTile = function (res, game, tile) {
    game.tiles.tryTiles.push(tile)

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'added try tile',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.removeTryTile = function (res, game, tile) {
    game.tiles.tryTiles = game.tryTiles.filter(t => t.id !== tile.id)

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'removed try tile',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.clearTryTiles = function (res, game) {
    game.tiles.tryTiles = []

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'cleared try tiles',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.dealPlayerTiles = function (res, game, tiles, player) {
    const tileIds = tiles.map( t => t.id )

    game.tiles.playerTiles = game.tiles.playerTiles.concat(tiles)
    
    if (player === 1) {
        game.tiles.p1Tiles.concat(tileIds)
    } else if (player === 2) {
        game.tiles.p2Tiles.concat(tileIds)
    }

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `dealt tiles to player ${game.whoseTurn}`,
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.updateUnusedTiles = function (res, game, tiles) {
    game.tiles.unusedTiles = tiles

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'updated unused tiles',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.updateUsedTiles = function (res, game, tiles) {
        game.tiles.usedTiles.push(tiles)

        game.save()
        .then(game => res.json({
            status: 'success',
            message: 'updated used tiles',
            data: game
        }))
        .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.shufflePlayerTiles = function (res, game, tiles) {
    if (game.whoseTurn === 1) {
        game.tiles.p1Tiles = tiles
    } else {
        game.tiles.p2Tiles = tiles
    }

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `shuffled player ${game.whoseTurn}'s tiles`,
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}
















// /******** TILES ********/

// exports.selectTile = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.tiles.selected = req.body.selected 

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'set selected tile',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.deselectTile = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.tiles.selected = null

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'deselected tile',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.addToHand = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.tiles.playerTiles.push(req.body.tile)

//         if (game.whoseTurn === 1) {
//             game.tiles.p1Tiles.push(req.body.tile.id)
//         } else {
//             game.tiles.p2Tiles.push(req.body.tile.id)
//         }

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: `add tile to player ${game.whoseTurn}'s hand`,
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.removeFromHand = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.tiles.playerTiles = game.playerTiles.filter(pt => pt.id !== req.body.tile.id)

//         if (game.whoseTurn === 1) {
//             game.p1Tiles = game.p1Tiles.filter(tileId => tileId !== req.body.tile.id)
//         } else {
//             game.p2Tiles = game.p2Tiles.filter(tileId => tileId !== req.body.tile.id)
//         }

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: `removed tile from player ${game.whoseTurn}'s hand`,
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.addTryTile = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.tiles.tryTiles.push(req.body.tile)

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'added try tile',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.removeTryTile = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.tiles.tryTiles = game.tryTiles.filter(tile => tile.id !== req.body.tile.id)

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'removed try tile',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.clearTryTiles = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.tiles.tryTiles = []

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'cleared try tiles',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.dealPlayerTiles = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })
        
//         const tileIds = req.body.tiles.map( t => t.id )

//         game.tiles.playerTiles = game.tiles.playerTiles.concat(req.body.tiles)
        
//         if (req.body.player === 1) {
//             game.tiles.p1Tiles.concat(tileIds)
//         } else if (req.body.player === 2) {
//             game.tiles.p2Tiles.concat(tileIds)
//         }

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: `dealt tiles to player ${game.whoseTurn}`,
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.updateUnusedTiles = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })
        
//         game.tiles.unusedTiles = req.body.tiles

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'updated unused tiles',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.updateUsedTiles = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })
        
//         game.tiles.usedTiles.push(req.body.tiles)

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'updated used tiles',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.shufflePlayerTiles = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })
        
//         if (game.whoseTurn === 1) {
//             game.tiles.p1Tiles = req.body.tiles
//         } else {
//             game.tiles.p2Tiles = req.body.tiles
//         }

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: `shuffled player ${game.whoseTurn}'s tiles`,
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }
