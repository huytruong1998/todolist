import React, { Component } from "react";
import TaskForm from "./component/TaskForm";
import Search from "./component/Search";
import Sort from "./component/Sort";
import TaskList from "./component/TaskList";

import { connect } from "react-redux";
import * as actions from "./actions/index";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "name",
      sortValue: 1
    };
  }

  onToggleForm = () => {
    var { ItemEditing } = this.props;
    if (ItemEditing && ItemEditing.id !== "") {
      this.props.onClearTask({
        id: "",
        name: "",
        status: false
      });
    } else {
      this.props.onToggleForm();
    }
  };

  // onUpdateStatus = id => {
  //   var tasks = this.state.tasks;
  //   // var index = this.findIndex(id); // find task by id
  //   var index = _.findIndex(tasks, task => {
  //     return task.id === id;
  //   });
  //   if (index !== -1) {
  //     // set default -1
  //     tasks[index].status = !tasks[index].status;
  //     this.setState({
  //       tasks: tasks
  //     });
  //     localStorage.setItem("tasks", JSON.stringify(tasks));
  //   }
  // };

  render() {
    //get filter for filtering (onFilter)

    var { isDisplayForm } = this.props;

    // if (filter) {
    //   if (filter.name) {
    //     tasks = tasks.filter(task => {
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //     }); // changing tasks constantly to if provide real time sorting
    //   }
    //   tasks = tasks.filter(task => {
    //     if (filter.status === -1) {
    //       return task;
    //     } else {
    //       return task.status === (filter.status === 1 ? true : false);
    //     }
    //   });
    // }

    // if (keyword) {
    //   // tasks = tasks.filter(task => {
    //   //   return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   // });
    //   tasks = _.filter(tasks, task => {
    //     return (
    //       task.name.toLowerCase().indexOf(keyword.toLocaleLowerCase()) !== -1
    //     );
    //   });
    // }

    // if (sortBy === "name") {
    //   tasks.sort((a, b) => {
    //     if (a.name.toUpperCase() > b.name.toUpperCase()) return sortValue;
    //     else if (a.name.toUpperCase() < b.name.toUpperCase()) return -sortValue;
    //     else return 0;
    //   });
    // } else {
    //   tasks.sort((a, b) => {
    //     if (a.status.toUpperCase() > b.status.toUpperCase()) return -sortValue;
    //     else if (a.status.toUpperCase() < b.status.toUpperCase())
    //       return sortValue;
    //     else return 0;
    //   });
    // }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Job Management</h1> <br />
        </div>

        <div className="row">
          <div
            className={
              isDisplayForm === true
                ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                : ""
            }
          >
            <TaskForm
            // get id from this.onUpdate from tasksEditing
            />
          </div>

          <div
            className={
              isDisplayForm === true
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fas fa-plus mr-5" />&nbsp; Add Job
            </button>

            {/* Search - Sort */}
            <div className="row mt-15">
              {/* Search button */}
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Search />
              </div>
              {/* Sort */}
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Sort />
              </div>
            </div>

            {/* list */}

            <div className="row mt-15">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    ItemEditing: state.ItemEditing
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: task => {
      dispatch(actions.editItem(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    }
  };
};

// const mapDispatchToProps = {
//   onToggleForm: actions.toggleForm
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
