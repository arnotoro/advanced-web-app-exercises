const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username);
        if (user == null) {
            console.error('No user with that username');
            return done(null, false);
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log('Password matches for user: ' + user.username + ' with id: ' + user.id + '.');
                return done(null, user);
            } else {
                console.error('Password does not match!!');
                return done(null, false);
            }
        } catch (error) {
            return done(error);
        }
    }

    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

module.exports = initialize;