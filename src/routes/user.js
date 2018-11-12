import UserController from '../controllers/user';
import passport from 'passport';
module.exports = app => {
    let user = '/user/';
    app.post(`${user}sign-up`, UserController.addUser);

    app.post(`${user}verify`, UserController.verifyUser);
    app.post(`${user}send-otp`,
        passport.authenticate('local'),
        UserController.sendOTPLogin);
    app.post(`${user}sign-in`,
        passport.authenticate('local'),
        UserController.loginUser
    );
    app.get('/auth/linkedin',
        passport.authenticate('linkedin'));

    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin'),
        UserController.sociaLoginUser);
};