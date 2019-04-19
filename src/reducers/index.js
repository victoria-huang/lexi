import { combineReducers } from 'redux'
import cell from './cell'
import tile from './tile'
import errors from './errors'
import game from './game'

const rootReducer = combineReducers({
    cell,
    tile,
    errors,
    game
})

export default rootReducer