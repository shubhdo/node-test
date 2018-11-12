import passport from 'passport';
import ShaEncrypt from 'sha256';
import {
    Strategy as LocalStrategy
} from 'passport-local';
import User from './models/user';
passport.use(new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password'
    },
    function (username, password, done) {
        User.findOne({
            email: username
        }, 'password', function (err, user) {
            console.log(err, user);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }

            if (user.password !== ShaEncrypt(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));