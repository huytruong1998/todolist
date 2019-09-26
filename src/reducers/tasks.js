import * as types from "./../constants/ActionTypes";

var s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
var genereateID = () => {
  return s4() + "-" + s4() + "-" + s4() + "-" + s4();
};

var findIndex = (tasks, id) => {
  var result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
};

var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];
const myReducer = (state = initialState, action) => {
  var id = "";
  var index = -1;
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.SAVE_TASK:
      var task = {
        id: action.task.id,
        name: action.task.name,
        status: action.task.status === true ? true : false
      };
      if (!task.id) {
        task.id = genereateID();
        state.push(task);
      } else {
        index = findIndex(state, task.id);
        state[index] = task;
      }

      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.UPDATE_STATUS:
      id = action.id;
      index = findIndex(state, id);

      //state[index].status = !state[index].status; don't update immediately

      // LONG VER
      // var cloneTask = { ...state[index] }; // clone the task
      // cloneTask.status = !cloneTask.status; // change status
      // state[index] = cloneTask; // replace old task with clone task

      //SHORT VER
      state[index] = {
        ...state[index],
        status: !state[index].status
      };

      localStorage.setItem("tasks", JSON.stringify(state));

      return [...state];
    case types.DELETE_TASK:
      id = action.id;
      index = findIndex(state, id);
      state.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];

    default:
      return state;
  }
};

export default myReducer;

// clone new task = old task && status = !status
//delete old task => push new task. This help to update immediately
