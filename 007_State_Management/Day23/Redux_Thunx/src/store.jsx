import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Named import
import weatherReducer from "./reducer";

const store = createStore(weatherReducer, applyMiddleware(thunk));

export default store;
