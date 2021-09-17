import { combineReducers } from "redux";
import List from "./list";

const appReducer = combineReducers({
  list: List,
});

export default appReducer;
