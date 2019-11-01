import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            {/* why does {profile.user.profilePicture} give error? */}
            {/* {profile.profilePicture} makes space for pic but doesn't show it, no error given */}
            <img
              src={profile.profilePicture}
              alt=""
              className="rounded-circle"
            />
          </div>

          <div className="col-lg-6 col-md-4 col-8">
            {/* why does {profile.user.fullName} give error? */}
            {/* {profile.fullName} doesn't show, no error given */}            
            <h3>{profile.fullName}</h3>

            {/* why does {profile.user.userName} give error? */}
            {/* {profile.user} doesn't show, no error given */}
            <h3>{profile.userName}</h3>

            <h3>{profile.handle}</h3>

            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
