import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false
    };
  }

  componentWillMount() {
    if (this.props.ItemEditing && this.props.ItemEditing.id !== null) {
      this.setState({
        id: this.props.ItemEditing.id,
        name: this.props.ItemEditing.name,
        status: this.props.ItemEditing.status
      });
    } else {
      this.onClear();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.ItemEditing) {
      this.setState({
        id: nextProps.ItemEditing.id,
        name: nextProps.ItemEditing.name,
        status: nextProps.ItemEditing.status
      });
    } else if (!nextProps.ItemEditing) {
      this.setState({
        id: "", // if (id = "") -> Add Job else Update Job
        name: "",
        status: true
      });
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  onChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value
    });
  };

  onSave = event => {
    event.preventDefault();
    this.props.onSaveTask(this.state);
    //cancel and close form
    this.onClear();
    this.onCloseForm();
  };

  onClear = () => {
    this.setState({
      name: "",
      status: false
    });
  };
  render() {
    var { id } = this.state;
    if (!this.props.isDisplayForm) return null;
    return (
      <div>
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
              {!id ? "Add Job" : "Update Job"}
              <span
                className=" far fa-times-circle text-right"
                onClick={this.onCloseForm}
              />
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSave}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Input field"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Hidden</option>
                </select>
                <br />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  <span className=" fas fa-plus" />&nbsp; Save
                </button>&nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onClear}
                >
                  <span className="fas fa-times" />&nbsp; Cancel
                </button>
              </div>
            </form>
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
// const mapDispatchToProps = {
//   onAddTask: actions.addTask,
//   onCloseForm: actions.closeForm
// };

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: id => {
      dispatch(actions.saveTask(id));
    },
    onCloseForm: id => {
      dispatch(actions.closeForm(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
