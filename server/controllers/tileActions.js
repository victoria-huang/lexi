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

