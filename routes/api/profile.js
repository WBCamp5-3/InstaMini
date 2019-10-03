const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Validation
const validateProfileInput = require('../../validation/profile');
const validatePostsInput = require('../../validation/posts');
const validateTaggedInput = require('../../validation/tagged');




// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
			.populate("user", ["userName", "fullName", "profilePicture"])
			.then(profile => {
				if (!profile) {
					errors.noprofile = "There is no profile for this user";
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
  }
)


// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
		.populate("user", ["userName", "fullName", "profilePicture"])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = "There are no profiles";
				return res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch(err => res.status(404).json({ profile: "There are no profiles" }));
});



// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:h', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.h })
		.populate("user", ["userName", "fullName", "profilePicture"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});



// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
		.populate("user", ["userName", "fullName", "profilePicture"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err =>
			res.status(404).json({ profile: "There is no profile for this user" })
		);
});


// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.status = req.body.bio;

    // // Social
    // profileFields.social = {};
    // if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    // if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create

          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
              }
              // Save Profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            });
        }
      });
  }
);


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
      const newPosts = {
        image: req.body.image,
        location: req.body.location,
        description: req.body.description
      };

      // Add to posts array
      profile.posts.unshift(newPosts);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/tagged
// @desc    Add tagged to profile
// @access  Private
router.post(
  '/tagged',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaggedInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newTag = {
        image: req.body.image,
        location: req.body.location,
        description: req.body.description
      };

      // Add to tag array
      profile.tagged.unshift(newTag);

      profile.save().then(profile => res.json(profile));
    });
  }
);


module.exports = router;

