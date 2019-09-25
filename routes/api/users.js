const express = require("express");
const router = express.Router();
// bring in User model
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// @route   POST api/users/register
// @desc    Register a user
// @access  Public

// This route below is called when user hits submit button
// Express is already set up in server.js to use bodyParser in json format
// So, req will already be parsed as key value pair
// findOne is built in function of MongoDb
// User refers to User table, email is column in schema
// req is what user is sending
// Then and catch are promise statement, not like if and else
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: "Email already exists"
        });
      } else {
        // based on gravatar's api (url function, s,r,d, etc.)
        // gravatar uses user email to provide gravatar image
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        // building new user object to write to database
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          // avatar uses deconstruction since column and variable name are same
          avatar,
          password: req.body.password
        });
        // bcrypt has genSalt function
        // 10 (default) is for rounds, err & salt are parameters for callback function
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          // bcrypt hash takes in two parameters (password and salt) and callback (asynchronous function)
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // put new hashed password as user password in database
            newUser.password = hash;
            newUser
              .save() //mongoose feature
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
