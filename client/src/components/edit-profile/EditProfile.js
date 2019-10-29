import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { editProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      website: "",
      location: "",
      bio: "",
      gender: "",
      status: "",
      posts: "",
      tagged: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile) {
      const profile = nextProps.profile;

      // If profile field doesnt exist, make empty string
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.status = !isEmpty(profile.status) ? profile.status : "";

      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        location: profile.location,
        status: profile.status,
        bio: profile.bio
      });
    };
  };

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      status: this.state.status,
      bio: this.state.bio
    };

    this.props.editProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
			<div className="edit-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Edit Profile</h1>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="Your username"
								/>
								<TextFieldGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									error={errors.status}
									info="Give us an idea of what is your interest"
								/>

								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Could be your own website or a company one"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City or city and state suggested (eg. Boston, MA)"
								/>
								<TextAreaFieldGroup
									placeholder="Short Bio"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>
								<input
									type="submit"
									value="Submit"
									className="btn btn-info btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
  }
}

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editProfile, getCurrentProfile }
)(withRouter(EditProfile));
