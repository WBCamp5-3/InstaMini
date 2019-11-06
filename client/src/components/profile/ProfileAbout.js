import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
   
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
              {isEmpty(profile.posts) ? (
                <span>{profile.user.userName} does not have any posts</span>
              ) : (
                
                <span>
                  {/* {console.log(profile)};
                  {console.log("posts.length: " + profile.posts.length)};
                   */}
                    {profile.posts.map((post) => (
                      <ul>
                      <img
                        src={post.image}
                        style={{ width: 200 }}
                        alt=""
                        
                      />
                      </ul>
                    ))}
                  
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
