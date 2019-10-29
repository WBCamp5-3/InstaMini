import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Post extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const post = this.props.post.map(post => (
      <tr key={post._id}>
        <td>{post.image}</td>
        <td>{edu.location}</td>
        <td>{edu.description}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, post._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Posts</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Location</th>
              <th>Description</th>
              <th />
            </tr>
            {post}
          </thead>
        </table>
      </div>
    );
  }
}

Post.propTypes = {
  deletePost: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePost }
)(Post);
