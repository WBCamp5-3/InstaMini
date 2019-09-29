const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   POST api/profile/posts
// @desc    Add posts to profile
// @access  Private
router.post(
  '/posts',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostsInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newPost = {
        image: req.body.image,
        location: req.body.location,
        description: req.body.description
      };

      // Add to post array
      profile.posts.unshift(newPost);

      profile.save().then(profile => res.json(profile));
    });
  }
);



module.exports = router;


