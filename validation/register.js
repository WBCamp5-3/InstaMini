const Validator = require("validator");
// below is function we built ourselves
const isEmpty = require("../validation/is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // check if name,email. password and password2 is not empty
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //isLength function built-in in Validator
  if (!Validator.isLength(data.userName, { min: 2, Max: 30 })) {
		errors.userName = "Name must be between 2 and 30 characters";
	}

  if (Validator.isEmpty(data.userName)) {
		errors.userName = "userName field is required";
  }
  if (Validator.isEmpty(data.fullName)) {
		errors.fullName = "fullName field is required";
	}

    //Check for valid email address with built-in isEmail function
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  
  
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }


  //isLength function built-in in Validator
  if (!Validator.isLength(data.password, { min: 8, Max: 30 })) {
    errors.password = "Password must be between 8 and 30 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    //if object is empty then data is valid
    //using isEmpty function we built in is-empty.js
    isValid: isEmpty(errors)
  };
};
