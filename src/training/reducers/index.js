import status from "./status"; // reducer status
import sort from "./sort"; // reducer sort
import { combineReducers } from "redux";

const myReducer = combineReducers({
  status, //status: status
  sort //sort:{by : by, value : value}
});

export default myReducer;
