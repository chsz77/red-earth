import { LOAD_IMAGES, DELETE_IMAGE, LOAD_IMAGE, LOAD_MORE_IMAGES, MARKED_RED, UNMARKED_RED } from "../actionTypes";

const images = (state = [], action) => {
    switch (action.type) {
        case LOAD_IMAGES:
            return action.images;
        case LOAD_MORE_IMAGES:
            return [...state, ...action.moreImages]
        case LOAD_IMAGE:
            return action.image
        case MARKED_RED:
            return state.push(action.markedRed)
        case UNMARKED_RED:
            return state.level.pull(action.unMarkedRed)
        case DELETE_IMAGE:
            return state.filter(image => image._id !== action.id)
        default:
            return state
    }
}

export default images