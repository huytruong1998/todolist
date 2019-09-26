import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1 // all :-1, active : 1, hidden: 0
    };
  }

  onChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value === "checkbox" ? target.checked : target.value;

    this.setState(
      {
        [name]: value
      },
      function() {
        var filter = {
          name: name === " filterName" ? value : this.state.filterName,
          status: name === " filterStatus" ? value : this.state.filterStatus
        };
        this.props.onFilterTable(
          filter
          // name === " filterName" ? value : this.state.filterName,
          // name === " filterStatus" ? value : this.state.filterStatus
        );
      }
      // function() {
      //   this.props.onFilter(
      //     name === " filterName" ? value : this.state.filterName,
      //     name === " filterStatus" ? value : this.state.filterStatus
      //   );
      // }
    );

    // this.props.onFilter(
    //   name === " filterName" ? value : this.state.filterName,
    //   name === " filterStatus" ? value : this.state.filterStatus
    // );
  };

  render() {
    var { tasks, filterTable, keyword, sort } = this.props; //var tasks = this,props.tasks (get from redux initialState)

    var { filterName, filterStatus } = this.state;

    if (filterTable) {
      if (filterTable.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
        });
      }
      tasks = tasks.filter(task => {
        if (filterTable.status === -1) {
          return task;
        } else {
          return task.status === (filterTable.status === 1 ? true : false);
        }
      });
    }

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

    //sort
    if (sort.by === "name") {
      tasks.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return sort.value;
        else if (a.name.toUpperCase() < b.name.toUpperCase())
          return -sort.value;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else return 0;
      });
    }

    // tasks = tasks.filter(task => {
    //   return task.name.toLowerCase().indexOf(keyword) !== -1;
    // });
    tasks = tasks.filter(task => {
      return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    var elmTasks = tasks.map((task, index) => {
      return (
        <TaskItem
          key={task.id}
          index={index}
          task={task}
          onUpdate={this.props.onUpdate}
        />
      ); // give props to TasksItem but in loop use (key) to identify
    });
    return (
      <div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">No.</th>
              <th className="text-center">Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="filterName"
                  value={filterName}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <select
                  name="filterStatus"
                  className="form-control"
                  value={filterStatus}
                  onChange={this.onChange}
                >
                  <option value={-1}>All</option>
                  <option value={0}>Hidden</option>
                  <option value={1}>Active</option>
                </select>
              </td>
              <td />
            </tr>
            {elmTasks}
            {/*  task from App.js to TaskList to TaskItem */}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyword: state.search,
    sort: state.sort
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: filter => {
      dispatch(actions.filterTask(filter));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
