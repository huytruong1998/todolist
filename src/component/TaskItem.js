import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };

  onDelete = () => {
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseForm();
  };

  onEditTask = () => {
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);
  };
  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            onClick={this.onUpdateStatus}
            className={
              task.status === true
                ? "label label-success"
                : "label label-danger"
            }
          >
            {task.status === true ? "Active" : "Hidden"}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.onEditTask}
          >
            <span className="far fa-edit mr-5" />
            Fix
          </button>&nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.onDelete}
          >
            <span className="fas fa-eraser mr-5" />
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

// const mapDispatchToProps = {
//   onUpdateStatus: actions.updateStatus
// };

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: id => {
      dispatch(actions.updateStatus(id));
    },
    onDeleteTask: id => {
      dispatch(actions.deleteTask(id));
    },
    onCloseForm: id => {
      dispatch(actions.closeForm(id));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    onEditTask: task => {
      dispatch(actions.editItem(task));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskItem);
