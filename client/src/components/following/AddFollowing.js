import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addFollowing } from "../../actions/followingActions";

class AddFollowing extends Component {
	
 render() {
    const { errors } = this.state;
    return (
      <div className="addfollowing">
        <div className="container">
          <div className="row">
             
              </div>
        </div>
    </div> );
  } 

}


AddFollowing.propTypes = {
	addFollowing: PropTypes.func.isRequired,
	following: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	following: state.following
});

export default connect(
	mapStateToProps,
	{ addFollowing }
)(AddFollowing);


