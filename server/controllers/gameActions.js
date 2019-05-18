module.exports.startGame = function (res, game) {
    game.gameStart = true 

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'game started',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.endGame = function (res, game) {
    game.gameOver = true 

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'game ended',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.addPoints = function (res, game, points, p1, p2) {
    if (game.whoseTurn === 1) {
        game.p1Points += points

        User.updateOne(
            { '_id': p1, 'currentGames.gameId': game._id },
            { 
                '$set': {
                    'currentGames.$.points': game.p1Points
                }
            }, 
            function (err, numAffected) {
                if (err) return res.json({ status: 'error', message: err })
            }
        )

        User.updateOne(
            { '_id': p2, 'currentGames.gameId': game._id },
            { 
                '$set': {
                    'currentGames.$.otherPlayer.points': game.p1Points
                }
            }, 
            function (err, numAffected) {
                if (err) return res.json({ status: 'error', message: err })
            }
        )
    } else {
        game.p2Points += points

        User.updateOne(
            { '_id': p1, 'currentGames.gameId': game._id },
            { 
                '$set': {
                    'currentGames.$.otherPlayer.points': game.p2Points
                }
            }, 
            function (err, numAffected) {
                if (err) return res.json({ status: 'error', message: err })
            }
        )

        User.updateOne(
            { '_id': p2, 'currentGames.gameId': game._id },
            { 
                '$set': {
                    'currentGames.$.points': game.p2Points
                }
            }, 
            function (err, numAffected) {
                if (err) return res.json({ status: 'error', message: err })
            }
        )
    }

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `added ${points} points to player ${game.whoseTurn}`,
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.setExchanged = function (res, game) {
    game.exchanged = true 

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `set exchanged for player ${game.whoseTurn}`,
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.resetExchanged = function (res, game) {
    game.exchanged = false

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'reset exchanged',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.switchTurn = function (res, game) {
    if (game.whoseTurn === 1) {
        game.whoseTurn = 2
    } else {
        game.whoseTurn = 1
    }

    game.save()
    .then(game => res.json({
        status: 'success',
        message: `switched turn to player ${game.whoseTurn}`,
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}

module.exports.dealFirstHand = function (res, game) {
    game.firstHandDealt = true 

    game.save()
    .then(game => res.json({
        status: 'success',
        message: 'dealt first hand',
        data: game
    }))
    .catch(err => res.json({ status: 'error', message: err }))
}













// /******** GAMES ********/

// exports.startGame = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         // check to make sure only one of the players in the game is making requests
//         if (!currentUser(req).id === game.playerOne && !currentUser(req).id === game.playerTwo)
//             return res.status(401).send('unauthorized')

//         game.gameStart = true 

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'game started',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.endGame = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.gameOver = true 

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'game ended',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.addPoints = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         if (game.whoseTurn === 1) {
//             game.p1Points += req.body.points
//         } else {
//             game.p2Points += req.body.points
//         }

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: `added ${req.body.points} points to player ${game.whoseTurn}`,
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.setExchanged = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.exchanged = true 

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: `set exchanged for player ${game.whoseTurn}`,
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.resetExchanged = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.exchanged = false

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'reset exchanged',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.switchTurn = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         if (game.whoseTurn === 1) {
//             game.whoseTurn = 2
//         } else {
//             game.whoseTurn = 1
//         }

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: `switched turn to player ${game.whoseTurn}`,
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }

// exports.dealFirstHand = function (req, res) {
//     Game.findById(req.params.game_id, function (err, game) {
//         if (err) return res.json({ status: 'error', message: err })

//         game.firstHandDealt = true 

//         game.save()
//         .then(game => res.json({
//             status: 'success',
//             message: 'dealt first hand',
//             data: game
//         }))
//         .catch(err => res.json({ status: 'error', message: err }))
//     })
// }