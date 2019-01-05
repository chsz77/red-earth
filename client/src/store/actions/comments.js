import { apiCall } from "../../services/api"
import { addError } from "./errors"
import { LOAD_COMMENTS, DELETE_COMMENT, ADD_COMMENT, API } from "../actionTypes";

export const getComments = comments => ({
    type: LOAD_COMMENTS,
    comments
})


export const deleteId = id => ({
    type: DELETE_COMMENT,
    id
})

export const addComment = newComment => ({
    type: ADD_COMMENT,
    newComment
})

export const deleteComment = (comment_id, user_id ) => {
    return dispatch => {
        return apiCall("delete", `${API}/api/comments/${comment_id}/${user_id}`)
            .then(() => dispatch(deleteId(comment_id)))
            .catch(err => {dispatch(addError(err.comment))})
    }
}


export const fetchComments = imageId => {
    return dispatch => {
        return apiCall("get", `${API}/api/comments/${imageId}`)
            .then(res => {dispatch(getComments(res))})
            .catch(err => {dispatch(addError(err.comment))})
    }
}


export const newComment = (data, user_id) => {
    return dispatch => {
        return apiCall("post", `${API}/api/comments/${user_id}`, data)
            .then(res => {dispatch(addComment(res))})
            .catch(err => {dispatch(addError(err.comment))})
    }
}