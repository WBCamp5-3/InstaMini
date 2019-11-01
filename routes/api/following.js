const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Following = require("../../models/Following");

const People = require("../../models/Following");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load Validation
const validateFollowingInput = require("../../validation/following");

// @route   GET api/following
// @desc    Get following
// @access  Public
router.get("/", (req, res) => {
  Following.find()
    .sort({ date: -1 })
    .then(followings => res.json(followings))
    .catch(err =>
      res.status(404).json({ nofollowingsfound: "No followings found" })
    );
});

// @route   POST api/following
// @desc    Create following
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
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

// @route   POST api/following/people
// @desc    Add people user is following to profile
// @access  Private

router.post(

    "/people",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateFollowingInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const newPeople = new People({
      userName: req.body.userName,
      fullName: req.body.fullName,
      profilePicture: req.body.profilePicture
    });
    newPeople.save().then(people => res.json(people));
  }
);

module.exports = router;
