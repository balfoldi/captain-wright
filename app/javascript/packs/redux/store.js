import playersReducer from './players/playersReducer'

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from "redux"
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  playersCreate: playersReducer,
});

let store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


export default store;
