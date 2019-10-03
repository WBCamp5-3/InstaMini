const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateFollowingInput(data) {
	let errors = {};

	ddata.userName = !isEmpty(data.userName) ? data.userName : "";
	data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
	data.profilePicture = !isEmpty(data.profilePicture)
		? data.profilePicture
		: "";

	if (!Validator.isLength(data.userName, { min: 2, max: 40 })) {
		errors.userName = "Handle needs to between 2 and 40 characters";
	}

	if (Validator.isEmpty(data.userName)) {
		errors.userName = " userName is required";
	}

	if (Validator.isEmpty(data.fullName)) {
		errors.fullName = "Full name field is required";
	}

	if (Validator.isEmpty(data.profilePicture)) {
		errors.profilePicture = "Profile picture field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
