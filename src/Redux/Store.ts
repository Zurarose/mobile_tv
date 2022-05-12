import {applyMiddleware, combineReducers, createStore} from "redux";
import ShowListReducer from "./ShowListReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  ShowList: ShowListReducer,
})

export type StateType = ReturnType<typeof reducers>

export let store = createStore(reducers, applyMiddleware(thunk))