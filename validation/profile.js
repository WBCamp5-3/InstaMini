const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : '';
  data.location = !isEmpty(data.location) ? data.location : "";
  


  if (!Validator.isLength(data.userName, { min: 2, max: 40 })) {
		errors.userName = "Handle needs to between 2 and 40 characters";
	}

  if (Validator.isEmpty(data.handle)) {
		errors.userName = "Profile handle is required";
  }
  if (Validator.isEmpty(data.status)) {
		errors.status = "status is required";
  }
  if (Validator.isEmpty(data.location)) {
		errors.location = "Location is required";
	}

   
  return {
    errors,
    isValid: isEmpty(errors)
  };
};