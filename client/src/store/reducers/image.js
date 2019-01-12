import { LOAD_IMAGE, MARKED_RED, UNMARKED_RED } from "../actionTypes";

const image = (state = {}, action) => {
    switch (action.type) {
        case LOAD_IMAGE:
            return action.image
        case MARKED_RED:
            return {...state, level:[...state.level, action.user_id], red: state.red+1}
        case UNMARKED_RED:
            return {...state, red: state.red-1, level:state.level.filter(level => !action.user_id)}
        default:
            return state
    }
}

export default image