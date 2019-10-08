const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateFollowingInput(data) {
	let errors = {};

	data.following = !isEmpty(data.following) ? data.following : "";

	
	if (Validator.isEmpty(data.following)) {
		errors.following = "this instamini not followed";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
