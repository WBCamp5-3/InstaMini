const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateFollowingInput(data) {
	let errors = {};

	data.follow = !isEmpty(data.follow) ? data.follow : "";

	
	if (Validator.isEmpty(data.follow)) {
		errors.follow = "this instamini not followed";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
