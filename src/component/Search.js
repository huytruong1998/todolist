import React, { Component } from "react";
import * as actions from "./../actions/index";
import { connect } from "react-redux";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }

  onChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };
  render() {
    var { keyword } = this.state;
    return (
      <div>
        <div className="input-group">
          <input
            type="text"
            name="keyword"
            className="form-control"
            placeholder="Enter keyword"
            value={keyword}
            onChange={this.onChange}
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onSearch}
            >
              <span className="fa fa-search mr-5" />
              Search
            </button>
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearch: keyword => {
      dispatch(actions.searchTask(keyword));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
