import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/";
import thunk from "redux-thunk";

    /* const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ) */

    
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
    ));
    
export default store;