const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTaggedInput(data) {
  let errors = {};

  data.image = !isEmpty(data.image) ? data.image : '';
  // data.location = !isEmpty(data.location) ? data.location : '';
  // data.description = !isEmpty(data.description) ? data.description : '';
  
  if (Validator.isEmpty(data.image)) {
    errors.image = 'Image field is required';
  }

  // if (Validator.isEmpty(data.location)) {
  //   errors.location = 'Location field is required';
  // }

  // if (Validator.isEmpty(data.description)) {
  //   errors.description = 'Description field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};