import React from "react"
import { Provider } from "react-redux"
import { configureStore } from "../store"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./Navbar"
import Main from "./Main"
import { setAuthorizationToken, setCurrentUser} from "../store/actions/auth"
import jwtDecode from "jwt-decode"

const store = configureStore()

if(localStorage.jwtToken && Math.floor(Date.now() / 60000) - localStorage.expired < 60 ) {
  setAuthorizationToken(localStorage.jwtToken);
  localStorage.setItem("expired", Math.floor(Date.now() / 60000));
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch(err) {
    store.dispatch(setCurrentUser({}));
  }
  
} else {localStorage.clear()}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </Router>  
  </Provider>
)

export default App;
