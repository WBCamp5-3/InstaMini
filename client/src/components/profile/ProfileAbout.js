import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    console.log(profile);
    console.log(profile.posts[0].image);

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">
              {profile.user.userName}'s Bio
            </h3>

            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{profile.user.userName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
          </div>

          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">
              {profile.user.userName}'s Posts
            </h3>

            <p className="lead">
              {isEmpty(profile.posts[0].image) ? (
                <span>{profile.user.userName} does not have any posts</span>
              ) : (
                // NEED TO LOOP THROUGH ARRAY OF IMAGES
                <span>
                  {console.log(profile)};
                  <img
                    src={profile.posts[0].image}
                    style={{ width: 200 }} alt=""
                  />
                </span>
              )}
            </p>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileAbout;
