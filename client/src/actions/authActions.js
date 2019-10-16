//this file is to write a function that triggers a dispatch call
//then that function will be hooked up to UI

import { SET_CURRENT_USER, GET_ERRORS } from "./types"; //bring in dispatcher
import axios from "axios";

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
