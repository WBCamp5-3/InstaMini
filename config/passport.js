//passport is a global library
//we use passport-jwt to identify the jwt token
const JwtStrategy = require('passport-jwt').Strategy;

//ExtractJwt helps to decrpt the token
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
//mongoose model that helps to extract data from payload
const User = mongoose.model('users');
// to get the secret keys
const keys = require('./keys');

const opts = {};

//User send a request with jwttoken.
//fromAuthHeaderAsBearerToken is a method that helps to extract the token

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


module.exports = passport => {
  passport.use(
    new JwtStrategy(opts,(payload, done) => {
        console.log(payload);
      })//
  )
}