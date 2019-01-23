import { apiCall } from "../../services/api"
import { addError } from "./errors"
import { LOAD_IMAGES, LOAD_IMAGE, LOAD_MORE_IMAGES, API, MARKED_RED, UNMARKED_RED } from "../actionTypes";
import queryString from 'query-string'

export const getImages = images => ({
    type: LOAD_IMAGES,
    images
})

export const getMoreImages = moreImages => ({
    type: LOAD_MORE_IMAGES,
    moreImages
})

export const getImage = image => ({
    type: LOAD_IMAGE,
    image
})

export const markedRed = user_id => ({
    type: MARKED_RED,
    user_id
})

export const unMarkedRed = user_id => ({
    type: UNMARKED_RED,
    user_id
})

export const deleteImage = (image_id, user_id) => {
    return dispatch => {
        return apiCall("delete", `${API}/api/images/${image_id}/${user_id}`)
            .then(() => image_id)
            .catch(err => {dispatch(addError(err.image))})
    }
}

export const fetchImages = (limit, skip, sort, location) => {
    return dispatch => {
        let query = {
            sort: sort,
            location: location
        }
        let apiQuery = "?" + queryString.stringify(query)
        return apiCall("get", `${API}/api/images/${limit}/${skip}${apiQuery}`)
            .then(res => {
                if(res.length === 0){
                    return false
                } else if (skip===0){
                    dispatch(getImages(res))
                } else {
                    dispatch(getMoreImages(res))
                }
            })
            .catch(err => {dispatch(addError(err.image))})
    }
}

export const fetchImage = image_id => {
    return dispatch => {
        return apiCall("get", `${API}/api/images/${image_id}`)
            .then(res => {
                dispatch(getImage(res))})
            .catch(err => {
                dispatch(addError(err.image))
                return false;})
    }
}

export const newImage = (data, user_id, image_id,  formType) => {
    return dispatch =>{
        if(formType === "edit"){
            return apiCall("put", `${API}/api/images/${image_id}/edit/${user_id}`, data)
        }
        return apiCall("post", `${API}/api/images/${user_id}`, data)
            .then(res => {})
            .catch(err => {dispatch(addError(err.image))})
    }
}

export const marked = (image_id, user_id) => {
    return dispatch => {
        return apiCall("post", `${API}/api/images/${image_id}/${user_id}`)
            .then(res => {
                if(res===true){
                    dispatch(markedRed(user_id))
                } else {
                    dispatch(unMarkedRed(user_id))
                }
            })
            .catch(err => {dispatch(addError(err.image))})
    }
}