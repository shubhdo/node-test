import passport from 'passport';
import ShaEncrypt from 'sha256';
import {
    Strategy as LocalStrategy
} from 'passport-local';
import {
    Strategy as LinkedInStrategy
} from 'passport-linkedin-oauth2';
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
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: 'http://127.0.0.1:5000/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_basicprofile']
}, function (accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile, done);
    User.findOne({
        'linkedin.id': profile.id
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'linkedin',
                linkedin: profile._json,
                status: 'Active'
            });
            user.save(function (err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            return done(err, user);
        }
    });
}));