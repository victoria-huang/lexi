import { ALL_CELLS } from '../constants'

const initialState = {
    allCells: ALL_CELLS,
    usedCells: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
}