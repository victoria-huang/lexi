import { combineReducers } from 'redux'
import cell from './cell'
import tile from './tile'
import errors from './errors'
import game from './game'
import user from './user'

const rootReducer = combineReducers({
    cell,
    tile,
    errors,
    game,
    user
})

export default rootReducer