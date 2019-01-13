import { LOAD_COMMENTS, DELETE_COMMENT, ADD_COMMENT, ADD_VOTE, REMOVE_VOTE, ADD_HATE, REMOVE_HATE } from "../actionTypes";

const comments = (state = [], action) => {
    switch (action.type) {
        case LOAD_COMMENTS:
            return [...action.comments];
        case ADD_COMMENT:
            return [action.newComment, ...state];
        case ADD_VOTE:
            return state.map(comment => {
                if(comment._id === action.comment_id){
                    return {...comment, helpful:[...comment.helpful, action.user_id], points: comment.points+1}
                } else return comment
            })
        case REMOVE_VOTE:
            return state.map(comment => {
                if(comment._id === action.comment_id){
                    return {...comment, helpful:[comment.helpful.filter(id => !action.user_id)], points: comment.points-1}
                } else return comment
            })
        case ADD_HATE:
            return state.map(comment => {
                if(comment._id === action.comment_id){
                    return {...comment, nothelpful:[...comment.nothelpful, action.user_id], points: comment.points-1}
                } else return comment
            })
        case REMOVE_HATE:
            return state.map(comment => {
                if(comment._id === action.comment_id){
                    return {...comment, nothelpful:[comment.nothelpful.filter(id => !action.user_id)], points: comment.points+1}
                } else return comment
            })    
        case DELETE_COMMENT:
            return state.filter(comments => comments._id !== action.id)
        default:
            return state
    }
}

export default comments