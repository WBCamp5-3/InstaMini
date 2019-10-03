const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateFollowingInput(data) {
	let errors = {};

	data.userName = !isEmpty(data.userName) ? data.userName : "";
	

	if (!Validator.isLength(data.userName, { min: 2, max: 40 })) {
		errors.userName = "userName needs to between 2 and 40 characters";
	}

	if (Validator.isEmpty(data.userName)) {
		errors.userName = "userName is required";
	}


	return {
		errors,
		isValid: isEmpty(errors)
	};
};
