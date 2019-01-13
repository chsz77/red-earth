import { apiCall } from "../../services/api"
import { addError } from "./errors"
import { LOAD_COMMENTS, DELETE_COMMENT, ADD_COMMENT, ADD_VOTE, REMOVE_VOTE, ADD_HATE, REMOVE_HATE, API } from "../actionTypes";

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

export const addVote = (comment_id, user_id) => ({
    type: ADD_VOTE,
    comment_id, user_id
})

export const removeVote = (comment_id, user_id) => ({
    type: REMOVE_VOTE,
    comment_id, user_id
})


export const addHate = (comment_id, user_id) => ({
    type: ADD_HATE,
    comment_id, user_id
})

export const removeHate = (comment_id, user_id) => ({
    type: REMOVE_HATE,
    comment_id, user_id
})

export const deleteComment = (comment_id, user_id, reply) => {
    return dispatch => {
        return apiCall("delete", `${API}/api/comments/${comment_id}/${user_id}`)
            .then(() => {
                if(reply==="reply"){ return comment_id}
                else {dispatch(deleteId(comment_id))}})
            .catch(err => {dispatch(addError(err.comment))})
    }
}


export const fetchComments = image_id => {
    return dispatch => {
        return apiCall("get", `${API}/api/comments/${image_id}`)
            .then(res => {dispatch(getComments(res))})
            .catch(err => {dispatch(addError(err.comment))})
    }
}


export const newComment = (data, user_id, reply) => {
    return dispatch => {
        return apiCall("post", `${API}/api/comments/${user_id}`, data)
            .then(res => {
                if(reply==="reply"){ return res}  
                else {dispatch(addComment(res))}}
                )
            .catch(err => {dispatch(addError(err.comment))})
    }
}

export const votes = (comment_id, user_id) => {
    return dispatch => {
        return apiCall("post", `${API}/api/comments/${comment_id}/${user_id}/votes`)
            .then(res => {
                if(res===true){
                    dispatch(addVote(comment_id, user_id))}
                else if(res===false){
                    dispatch(removeVote(comment_id, user_id))}
            })
            .catch(err => dispatch(addError(err.comment)))
    }
}


export const hates = (comment_id, user_id) => {
    return dispatch => {
        return apiCall("post", `${API}/api/comments/${comment_id}/${user_id}/hates`)
            .then(res => {
                if(res===true){
                    dispatch(addHate(comment_id, user_id))}
                else if(res===false){
                    dispatch(removeHate(comment_id, user_id))}
                // else if(res==="failed"){
                //     console.log("triggered")
                //     dispatch(votes(comment_id, user_id))
                // }
            })
            .catch(err => dispatch(addError(err.comment)))
    }
}