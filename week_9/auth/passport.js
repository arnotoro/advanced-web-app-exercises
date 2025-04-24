const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/Users');




module.exports = (passport) => {
    var options = {
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    };

    passport.use(new jwtStrategy(options, (jwtPayload, done) => {

        console.log(jwtPayload);

        User.findOne({email: jwtPayload.email}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })})
    );
};