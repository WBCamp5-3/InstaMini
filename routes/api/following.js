const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Following = require("../../models/Following");
// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model

// Load Validation
const validateFollowingInput = require("../../validation/following");

// @route   POST api/following
// @desc    Create following
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      const { errors, isValid } = validateFollowingInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    

    const newFollowing = new Following({
			follow: req.body.follow,
			userName: req.body.userName,
			fullName: req.body.fullName,
			profilePicture: req.body.profilePicture,
			user: req.user.id
		});

    newFollowing.save().then(following => res.json(following));
  }
);

   
module.exports = router;