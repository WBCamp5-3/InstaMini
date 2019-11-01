import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getFollowing } from "../../actions/followingActions";

class Following extends Component {
  componentDidMount() {
    this.props.getFollowing();
  }

  render() {
    const { following, loading } = this.props.following;
    let followingContent;

    if (following === null || loading) {
      followingContent = <Spinner />;
    } else {
      followingContent = (
				<div className="col-lg-6 col-md-4 col-8">
					<h3>{following.fullName}</h3>
					<h3>{following.userName}</h3>
				</div>
			);
    }

    return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h4 className="display-4">You Follow</h4>
							{followingContent}
						</div>
					</div>
				</div>
			</div>
		);
  }
}

Following.propTypes = {
  getFollowing: PropTypes.func.isRequired,
  following: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  following: state.following
});

export default connect(mapStateToProps, { getFollowing })(Following);
