import { combineReducers } from 'redux'
import cell from './cell'
import tile from './tile'
import errors from './errors'

const rootReducer = combineReducers({
    cell,
    tile,
    errors
})

export default rootReducer