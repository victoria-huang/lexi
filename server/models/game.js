const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const TileSchema = new Schema({
    letter: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const TilesSchema = new Schema({  
    unusedTiles: [TileSchema],
    tryTiles: [TileSchema],
    playerTiles: [TileSchema],
    p1Tiles: [{
        tileId: ObjectId
    }],
    p2Tiles: [{
        tileId: ObjectId
    }],
    usedTiles: [TileSchema],
    selected: ObjectId
}, { timestamps: true })

const WordsSchema = new Schema({
    word: {
        type: String,
        required: true 
    },
    phonetic: [{
        type: String
    }],
    meaning: [{
        meaningType: {
            type: String
        },
        definitions: [{
            type: String
        }]
    }]
}, { timestamps: true })

const CellSchema = new Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    bonus: {
        type: String,
        default: null
    },
    tileId: {
        type: ObjectId,
        default: null
    },
    value: {
        type: String,
        default: null
    },
    points: {
        type: Number,
        default: null
    },
    words: [WordsSchema]
}, { timestamps: true })

const CellsSchema = new Schema({
    allCells: [CellSchema],
    usedCells: [{
        cellId: ObjectId
    }]
}, { timestamps: true })

const GamesSchema = new Schema({
    playerOne: {
        type: ObjectId,
        required: true,
    },
    playerTwo: {
        type: ObjectId,
        required: true
    },
    p1Name: {
        type: String,
        required: true
    },
    p1Email: {
        type: String,
        required: true
    },
    p2Name: {
        type: String,
        required: true
    },
    p2Email: {
        type: String,
        required: true
    },
    p1Points: {
        type: Number,
        default: 0
    },
    p2Points: {
        type: Number,
        default: 0
    },
    exchanged: {
        type: Boolean,
        default: false
    },
    whoseTurn: {
        type: Number,
        default: 1
    },
    declined: {
        type: Boolean,
        default: false
    },
    gameOver: {
        type: Boolean,
        default: false
    },
    gameStart: {
        type: Boolean,
        default: false
    },
    firstHandDealt: {
        type: Boolean,
        default: false
    },
    tiles: TilesSchema,
    cells: CellsSchema
}, { timestamps: true })

module.exports = Game = mongoose.model('game', GamesSchema)

module.exports.get = function (callback, limit) {
    Game.find(callback).limit(limit)
}

module.exports.tile = mongoose.model('tile', TileSchema)
module.exports.tiles = mongoose.model('tiles', TilesSchema)

module.exports.cell = mongoose.model('cell', CellSchema)
module.exports.cells = mongoose.model('cells', CellsSchema)

GamesSchema.set('versionKey', false)
module.exports.schema = GamesSchema