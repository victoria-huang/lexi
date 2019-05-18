module.exports.updateCells = function (res, game, cells) {
    game.cells.allCells = cells
// check
    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'updated cells',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.setUsedCells = function(res, game, cellIds) {
    cellIds.forEach(cId => game.cells.usedCells.push(cId))
// check
    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'set used cells',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}



// /******** CELLS ********/

// exports.updateCells = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })
        
//         game.cells.allCells = req.body.cells

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'updated cells',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.setUsedCells = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })
        
//         game.cells.usedCells.push(req.body.cellIds)

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'set used cells',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }