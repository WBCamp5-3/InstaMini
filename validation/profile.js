const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
  data.profilePicture = !isEmpty(data.profilePicture) ? data.profilePicture : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = 'Full name field is required';
  }

  if (Validator.isEmpty(data.profilePicture)) {
    errors.profilePicture = 'Profile picture field is required';
  }

 
  return {
    errors,
    isValid: isEmpty(errors)
  };
};