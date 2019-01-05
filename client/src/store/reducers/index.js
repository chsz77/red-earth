import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import images from "./images";
import comments from "./comments";

const rootReducer = combineReducers({
    currentUser,
    errors,
    images,
    comments
})

export default rootReducer