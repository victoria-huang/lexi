import { combineReducers } from 'redux'
import cell from './cell'
import tile from './tile'
import errors from './errors'
import game from './game'
import user from './user'
import notification from './notification'

const rootReducer = combineReducers({
    cell,
    tile,
    errors,
    game,
    user,
    notification
})

export default rootReducer