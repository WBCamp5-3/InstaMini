//The built-in JavaScript isEmpty function doesn't check for empty objects so we are building our own function to do that

const isEmpty = value =>
  value === undefined ||
  value === null ||
  //checks for empty object
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

//*******Below is old way to write above function*******/
// function isEmpty(value) {
//   return (
//     value === undefined ||
//     value === null ||
//     //checks for empty object
//     (typeof value === "object" && Object.keys(value).length === 0) ||
//     (typeof value === "string" && value.trim().length === 0)
//   );
// }

module.exports = isEmpty;
