const express = require("express");
const router = express.Router();
// bring in User model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public

// this route is called when user hits submit button
// Express is already set up in server.js to use bodyParser in json format
// So, req will already be parsed as key value pair
// findOne is built in function of MongoDb
router.post('/register', (req, res)=>{
  User.findOne({email: req.body.email})
  .then()
  .catch()
})

module.exports = router;
