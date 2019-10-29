import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    //***Add later ***/
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  //render() is last part of life cycle
  render() {
    const { isAuthenticated, user } = this.props.auth; //destructuring

    //Navbar links for authenticated user
    const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/feed">
						Image Feed
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<a
						href=""
						onClick={this.onLogoutClick.bind(this)}
						className="nav-link"
					>
						<img
							className="rounded-circle"
							src={user.profilePicture}
							alt={user.name}
							style={{ width: "25px", marginRight: "5px" }}
							title="You must have a Gravatar connected to your email to display an image"
						/>{" "}
						Logout
					</a>
				</li>
			</ul>
		);

    //Navbar links for unauthenticated user
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            InstaMini
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Users
                </Link>
              </li>
            </ul>
            {/* Navbar changes depending on authentication */}
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

//Make sure these are ready and available
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

//Put auth info from state into props
const mapStateToProps = state => ({
  auth: state.auth
});

//**** Add clearCurrentProfile later
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
