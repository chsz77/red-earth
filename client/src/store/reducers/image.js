import { LOAD_IMAGE, MARKED_RED, UNMARKED_RED } from "../actionTypes";

const image = (state = {}, action) => {
    switch (action.type) {
        case LOAD_IMAGE:
            return action.image
        case MARKED_RED:
            return {...state, red: state.red+1}
        case UNMARKED_RED:
            return {...state, red: state.red-1}
        default:
            return state
    }
}

export default image