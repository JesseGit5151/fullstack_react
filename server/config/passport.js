const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require("../models/users");
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload)
    Users.findOne({id: jwt_payload.id}, function(err, user) {
        console.log(jwt_payload)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));