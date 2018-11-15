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
        function (req, res) {
            res.redirect('http://localhost:4200/profile?' + req.user);
        });
    app.post(`${user}social-login`, UserController.sociaLoginUser);
    app.get(`${user}`, UserController.getAllUsers);
    app.post(`${user}update`, UserController.editUser);
    app.get(`${user}:id`, UserController.getUser);
    app.post(`${user}delete`, UserController.deleteUser);
    app.post(`${user}add`, UserController.addUserFromAdmin);
};
