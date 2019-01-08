import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import images from "./images";
import image from "./image";
import comments from "./comments";

const rootReducer = combineReducers({
    currentUser,
    errors,
    images,
    image,
    comments
})

export default rootReducer