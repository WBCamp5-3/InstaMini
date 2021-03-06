import React, { Component } from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux"; //for store
import store from "./store";
import jwt_decode from "jwt-decode"; //decoder for client side
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import EditProfile from "./components/edit-profile/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import AddPost from "./components/add-posts/AddPost";
import Following from "./components/following/Following";


//check for token
if (localStorage.jwtToken) {
  //set the auth token Header
  setAuthToken(localStorage.jwtToken);

  // decode the token and get the user
  const decoded = jwt_decode(localStorage.jwtToken);

  //set user to redux
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout the user
    store.dispatch(logoutUser());
    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/Login" component={Login} />
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/:handle" component={Profile} />
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/edit-profile"
									component={EditProfile}
								/>
							</Switch>
							<Switch>
								<PrivateRoute exact path="/add-posts" component={AddPost} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/following" component={Following} />
							</Switch>
							{/* <Switch>
								<PrivateRoute exact path="/following/:id" component={Following} />
							</Switch> */}
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
  }
}

export default App;
