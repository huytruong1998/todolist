import * as types from "./../constants/ActionTypes";

export const listAll = task => dispatch => {
  return dispatch({
    type: types.LIST_ALL //create action with type LIST_ALL
  });
};

export const saveTask = task => {
  return {
    type: types.SAVE_TASK,
    task // task: task
  };
};

export const toggleForm = () => {
  return {
    type: types.TOGGLE_FORM
  };
};

// export const toggleForm = () => dispatch => {
//   return dispatch({
//     type: types.TOGGLE_FORM //create action with type LIST_ALL
//   });
// };

export const openForm = () => {
  return { type: types.OPEN_FORM }; //create action with type LIST_ALL
};

export const closeForm = () => {
  return {
    type: types.CLOSE_FORM
  };
};

// export const updateStatus = id => dispatch => {
//   dispatch({
//     type: types.UPDATE_STATUS,
//     id
//   });
// };

export const updateStatus = id => {
  return {
    type: types.UPDATE_STATUS,
    id
  };
};

export const deleteTask = id => {
  return {
    type: types.DELETE_TASK,
    id
  };
};

export const editItem = task => {
  return {
    type: types.EDIT_ITEM,
    task
  };
};

export const filterTask = filter => {
  return {
    type: types.FILTER_TABLE,
    filter
  };
};

export const searchTask = keyword => {
  return {
    type: types.SEARCH,
    keyword
  };
};

export const sortTask = sort => {
  return {
    type: types.SORT,
    sort
  };
};
