import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER, API } from "../actionTypes";
import { addError, removeError } from "./errors";


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token)
}

export function logout(){
  return dispatch => {
    localStorage.clear();
    setTokenHeader(false)
    dispatch(setCurrentUser({}))
  }
}

export function authUser(type, userData) {
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
      return apiCall("post", `${API}/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("expired", Math.floor(Date.now() / 60000));
          dispatch(setCurrentUser(user));
          setAuthorizationToken(token);
          dispatch(removeError());
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message))
          reject(); // indicate the API call failed
        });
    });
  };
}
