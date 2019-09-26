import { createStore } from "redux";
import { status, sort } from "./action/index";
// http://www.dotnetcurry.com/reactjs/1356/redux-pattern-tutorial
import myReducer from "./reducers/index";
const store = createStore(myReducer); // tham so
console.log("Default: ", store.getState());
store.dispatch(status());
// create action change status
//get action into dispatch

console.log("TOGGLE_STATUS: ", store.getState());
//after action been made
//made action sort A-Z

store.dispatch(
  sort({
    by: "name",
    value: -1
  })
);
console.log("SORT: ", store.getState());
