import axios from "axios";

import {
	ADD_FOLLOWING,
	GET_ERRORS,
	CLEAR_ERRORS,
	// GET_FOLLOWINGS,
	GET_FOLLOWING,
	FOLLOWING_LOADING,
	DELETE_FOLLOWING
} from "./types";

// Add Post
export const addFollowing = followingData => dispatch => {
	dispatch(clearErrors());
	axios
		.post("/api/following", followingData)
		.then(res =>
			dispatch({
				type: ADD_FOLLOWING,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// // Get Followings
// export const getFollowing = () => dispatch => {
// 					dispatch(setFollowingLoading());
// 					axios
// 						.get("/api/following")
// 						.then(res =>
// 							dispatch({
// 								type: GET_FOLLOWING,
// 								payload: res.data
// 							})
// 						)
// 						.catch(err =>
// 							dispatch({
// 								type: GET_FOLLOWING,
// 								payload: null
// 							})
// 						);
// 				};

// Get Following with id
export const getFollowing = id => dispatch => {
					dispatch(setFollowingLoading());
					axios
						.get(`/api/following/${id}`)
						.then(res =>
							dispatch({
								type: GET_FOLLOWING,
								payload: res.data
							})
						)
						.catch(err =>
							dispatch({
								type: GET_FOLLOWING,
								payload: null
							})
						);
				};

// Delete Following
export const deleteFollowing = id => dispatch => {
					axios
						.delete(`/api/following/${id}`)
						.then(res =>
							dispatch({
								type: DELETE_FOLLOWING,
								payload: id
							})
						)
						.catch(err =>
							dispatch({
								type: GET_ERRORS,
								payload: err.response.data
							})
						);
				};


// Set loading state
export const setFollowingLoading = () => {
					return {
						type: FOLLOWING_LOADING
					};
				};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
