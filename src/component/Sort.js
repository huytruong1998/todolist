import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class Sort extends Component {
  onClick = (sortBy, sortValue) => {
    this.props.onSort({
      by: sortBy,
      value: sortValue
    });
  };
  render() {
    return (
      <div>
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
          >
            Sort<span className="far fa-caret-square-down ml-5" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={() => this.onClick("name", 1)}>
              {/*arrow function insert value */}
              <a
                role="button"
                className={
                  this.props.sort.by === "name" && this.props.sort.value === 1
                    ? "sort-selected"
                    : " "
                }
              >
                <span className="fas fa-sort-alpha-down pr-5">Name A-Z</span>
              </a>
            </li>
            <li onClick={() => this.onClick("name", -1)}>
              <a
                role="button"
                className={
                  this.props.sort.by === "name" && this.props.sort.value === -1
                    ? "sort-selected"
                    : " "
                }
              >
                <span className="fas fa-sort-alpha-up pr-5">Name Z-A</span>
              </a>
            </li>
            <li />
            <li onClick={() => this.onClick("status", 1)}>
              <a
                role="button"
                className={
                  this.props.sort.by === "status" && this.props.sort.value === 1
                    ? "sort-selected"
                    : " "
                }
              >
                Active
              </a>
            </li>
            <li onClick={() => this.onClick("status", -1)}>
              <a
                role="button"
                className={
                  this.props.sort.by === "status" &&
                  this.props.sort.value === -1
                    ? "sort-selected"
                    : " "
                }
              >
                Passive
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sort: state.sort
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSort: sort => {
      dispatch(actions.sortTask(sort));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sort);
