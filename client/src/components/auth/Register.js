import React, { Component } from "react";
import classnames from 'classnames';
import {registerUser} from '../../actions/authActions';
import {connect}from 'react-redux'; //connects component to redux store
import PropTypes from 'prop-types';

class Register extends Component {
  constructor() {
    //super() calls base class (component)
    super();
    this.state = {
      userName: "",
      fullName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      userName: this.state.userName,
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  //in mapStateToProps new data was written to props, now props has new data and this lifecycle (componentWillReceiveProps) is triggered
  componentWillReceiveProps(nextProps) {
		if(nextProps.errors){
			this.setState({errors:nextProps.errors});
		}
	}

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your InstaMini account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.userName
                    })}
                    placeholder="User Name"
                    value={this.state.userName}
                    onChange={this.onChange}
                    name="userName"
                    required
                  />
                  {errors.userName && (
                    <div className="invalid-feedback">{errors.userName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fullName
                    })}
                    placeholder="Full Name"
                    value={this.state.fullName}
                    onChange={this.onChange}
                    name="fullName"
                    required
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onChange}
                    name="email"
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    name="password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    name="password2"
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//make sure prop types exist before component is loaded
Register.propTypes={
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

//take redux state data and match to properties of (Register) component
//we only care about auth and errors data
const mapStateToProps = (state)=>({
	auth: state.auth,
	errors: state.errors
})

// connect Register component with store, UI will trigger registerUser
// connect function connects component to action
// connect takes two parameters
// 1)function that gets called when data comes in
// 2)The action the component (Register component) is going to fire (registerUser action) for when data goes out

export default connect(mapStateToProps, {registerUser}) (Register);
