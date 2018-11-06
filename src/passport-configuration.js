import passport from 'passport';
import ShaEncrypt from 'sha256';
import {
    Strategy as LocalStrategy
} from 'passport-local';
import {
    Strategy as LinkedInStrategy
} from 'passport-linkedin-oauth2';
import User from './models/user';

passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_API_KEY,
        clientSecret: process.env.LINKEDIN_SECRET_KEY,
        callbackURL: 'http://127.0.0.1:3000/auth/linkedin/callback'
    },
    function (token, tokenSecret, profile, done) {
        console.log(token, tokenSecret, profile, done);
        User.findOne({
            'socialLoginSchema.facebook.id': profile.id
        }, function (err, user) {
            console.log(err, user);
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider: 'facebook',
                    facebook: profile._json
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