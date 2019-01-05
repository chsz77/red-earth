import { LOAD_COMMENTS, DELETE_COMMENT, ADD_COMMENT } from "../actionTypes";

const comments = (state = [], action) => {
    switch (action.type) {
        case LOAD_COMMENTS:
            return [...action.comments];
        case ADD_COMMENT:
            return [action.newComment, ...state];
        case DELETE_COMMENT:
            return state.filter(image => image._id !== action.id)
        default:
            return state
    }
}

export default comments