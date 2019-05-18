module.exports.selectTile = function (res, game, selected) {
    game.tiles.selected = selected 
    
    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'set selected tile',
        game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.deselectTile = function (res, game) { 
    game.tiles.selected = null

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'deselected tile',
        game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.addToHand = function (res, game, tile, player) {
    game.tiles.playerTiles.push(tile)

    if (player === 1) {
        game.tiles.p1Tiles.push(tile._id)
    } else {
        game.tiles.p2Tiles.push(tile._id)
    }

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `add tile to player ${player}'s hand`,
        game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.removeFromHand = function (res, game, tile, player) {
    game.tiles.playerTiles.pull(tile._id)

    if (player === 1){
        game.tiles.p1Tiles.pull(tile._id)
    } else {
        game.tiles.p2Tiles.pull(tile._id)
    }

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `removed tile from player ${player}'s hand`,
        game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.addTryTile = function (res, game, tile) {
    game.tiles.tryTiles.push(tile)

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'added try tile',
        game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.removeTryTile = function (res, game, tile) {
    game.tiles.tryTiles.pull(tile._id)

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'removed try tile',
        game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.clearTryTiles = function (res, game) {
    game.tiles.tryTiles = []

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'cleared try tiles',
        game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.dealPlayerTiles = function (res, game, tiles, player) {
    const tileIds = tiles.map( t => t._id )

    tiles.forEach(tile => game.tiles.playerTiles.push(tile))
    
    if (player === 1) {
        tileIds.forEach(tId => game.tiles.p1Tiles.push(tId))
    } else if (player === 2) {
        tileIds.forEach(tId => game.tiles.p2Tiles.push(tId))
    }

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `dealt tiles to player ${player}`,
        game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.updateUnusedTiles = async function (res, game, tiles) {
    game.tiles.unusedTiles = tiles
 
    await game.save()
    .then(game => res.json({
        status: 'success',
        message: 'updated unused tiles',
        game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.updateUsedTiles = function (res, game, tiles) {
    if (Array.isArray(tiles)) tiles.forEach(tile => game.tiles.usedTiles.push(tile))
    else game.tiles.usedTiles.push(tiles)

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'updated used tiles',
        game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.shufflePlayerTiles = function (res, game, tiles, player) {
    tiles = tiles.map(t => { _id: t })

    if (player === 1) {
        game.tiles.p1Tiles = tiles
    } else {
        game.tiles.p2Tiles = tiles
    }

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `shuffled player ${player}'s tiles`,
        game
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
