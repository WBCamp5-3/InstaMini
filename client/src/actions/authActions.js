//this file is to write a function that triggers a dispatch call
//then that function will be hooked up to UI

import { SET_CURRENT_USER, GET_ERRORS } from "./types"; //bring in dispatcher
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register user
// Action = registerUser
// called when register button clicked
// userData is from form
// authReducer is listening for this dispatch call
export const registerUser = (userData, history) => dispatch => {
  axios
  .post("/api/users/register", userData)
  //if success, route user to login page
  .then(res => history.push('/login'))
  //if error, make dispatch call and write error to store
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
    );
};


export const loginUser = userData => dispatch => {
  	axios
			.post("/api/users/login", userData)
			.then(res => {
        // save token to localstorage
        const {token} = res.data;
        localStorage.setItem('jwtToken', token);

        //set token to Auth Header
        setAuthToken(token);

        //decode token to get user data
        const decoded =jwt_decode(token);

        //Store User data in redux
        dispatch(setCurrentUser(decoded));



      })
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
};


export const setCurrentUser =(decoded) => {
  return {
    type:SET_CURRENT_USER,
    payload:decoded
  }
}

export const logoutUser = () => dispatch => {

  //remove token from localstorage
  localStorage.removeItem('jwtToken');

  //remove  token from authHeader
  setAuthToken(false);

  //clear user from redux store
  dispatch(setCurrentUser({}));

}