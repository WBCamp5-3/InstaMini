//passport is a global library
//we use passport-jwt to identify the jwt token
const JwtStrategy = require("passport-jwt").Strategy;

//ExtractJwt helps to decrypt the token
const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
//mongoose model that helps to extract data from payload
const User = mongoose.model("users");
// to get the secret keys
const keys = require("./keys");

const opts = {};

//User send a request with jwttoken.
//fromAuthHeaderAsBearerToken is a method that helps to extract the token

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      // every mongoose document has an id column
      User.findById(payload.id)
        .then(user => {
          if (user) {
            //pass on to next api call
            //done is built-in callback in passport
            //done takes in two parameters: 1)any errors (none) & 2)info you need to pass (whole user object)
            return done(null, user);
          }
          // no errors and no user (having no user is not an error)
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
