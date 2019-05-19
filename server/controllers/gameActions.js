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

    User.updateOne(
        { '_id': game.playerOne, 'games.gameId': game._id },
        { 
            '$set': {
                'games.$.current': false
            }
        }, 
        function (err, numAffected) {
            if (err) return res.json({ status: 'error', message: err })
        }
    )

    User.updateOne(
        { '_id': game.playerTwo, 'games.gameId': game._id },
        { 
            '$set': {
                'games.$.current': false
            }
        }, 
        function (err, numAffected) {
            if (err) return res.json({ status: 'error', message: err })
        }
    )

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
            { '_id': p1, 'games.gameId': game._id },
            { 
                '$set': {
                    'games.$.points': game.p1Points
                }
            }, 
            function (err, numAffected) {
                if (err) return res.json({ status: 'error', message: err })
            }
        )

        User.updateOne(
            { '_id': p2, 'games.gameId': game._id },
            { 
                '$set': {
                    'games.$.otherPlayer.points': game.p1Points
                }
            }, 
            function (err, numAffected) {
                if (err) return res.json({ status: 'error', message: err })
            }
        )
    } else {
        game.p2Points += points

        User.updateOne(
            { '_id': p1, 'games.gameId': game._id },
            { 
                '$set': {
                    'games.$.otherPlayer.points': game.p2Points
                }
            }, 
            function (err, numAffected) {
                if (err) return res.json({ status: 'error', message: err })
            }
        )

        User.updateOne(
            { '_id': p2, 'games.gameId': game._id },
            { 
                '$set': {
                    'games.$.points': game.p2Points
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

        User.updateOne(
            { '_id': game.playerOne, 'games.gameId': game._id },
            { 
                '$set': {
                    'games.$.whoseTurn': game.playerTwo
                }
            }, 
            function (err, numAffected) {
                if (err) return res.json({ status: 'error', message: err })
            }
        )
    
        User.updateOne(
            { '_id': game.playerTwo, 'games.gameId': game._id },
            { 
                '$set': {
                    'games.$.whoseTurn': game.playerTwo
                }
            }, 
            function (err, numAffected) {
                if (err) return res.json({ status: 'error', message: err })
            }
        )
    } else {
        game.whoseTurn = 1

        User.updateOne(
            { '_id': game.playerOne, 'games.gameId': game._id },
            { 
                '$set': {
                    'games.$.whoseTurn': game.playerOne
                }
            }, 
            function (err, numAffected) {
                if (err) return res.json({ status: 'error', message: err })
            }
        )
    
        User.updateOne(
            { '_id': game.playerTwo, 'games.gameId': game._id },
            { 
                '$set': {
                    'games.$.whoseTurn': game.playerOne
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

