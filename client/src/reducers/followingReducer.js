import {
	ADD_FOLLOWING,
	// GET_FOLLOWINGS,
	GET_FOLLOWING,
	DELETE_FOLLOWING,
	FOLLOWING_LOADING
} from "../actions/types";

const initialState = {
	following: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FOLLOWING_LOADING:
			return {
				...state,
				loading: true
			};
		// case GET_FOLLOWINGS:
		// 	return {
		// 		...state,
		// 		followings: action.payload,
		// 		loading: false
		// 	};
		case GET_FOLLOWING:
			return {
				...state,
				following: action.payload,
				loading: false
			};
		case ADD_FOLLOWING:
			return {
				...state,
				following: [action.payload, ...state.following]
			};
		case DELETE_FOLLOWING:
			return {
				...state,
				following: state.following.filter(following => following._id !== action.payload)
			};
		default:
			return state;
	}
}
