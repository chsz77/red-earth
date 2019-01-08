import { LOAD_IMAGES,LOAD_MORE_IMAGES } from "../actionTypes";

const images = (state = [], action) => {
    switch (action.type) {
        case LOAD_IMAGES:
            return action.images;
        case LOAD_MORE_IMAGES:
            return [...state, ...action.moreImages]
        default:
            return state
    }
}

export default images