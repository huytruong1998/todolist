var initialState = false;
var myReducer = (state = initialState, action) => {
  if (action.type === "TOGGLE_STATUS") {
    state = !state; //use state instead of state.status because state only have T/F
    return state;
  }
  return state;
};

export default myReducer;
