import User from '../models/user';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';
async function addUser(req, res) {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user)
            sendResponse(res, 500, 'User already exists');
        else {
            req.body.speakeasy_secret = speakeasy.generateSecret({
                length: 20
            });

            let newUser = await new User(req.body).save();
            console.log(newUser);
            let token = jwt.sign({
                data: newUser._id
            }, Constants.JWT_SECRET);
            let link = `http://localhost:4200/auth/registration/activate/${token}`;
            console.log(link);
            let storeToken =
                await User.findByIdAndUpdate(newUser._id, {
                    $set: {
                        token: token
                    }
                });
            sendResponse(res, 200,
                'Please verify your email to procced.');
            SendMail(Constants.MAIL_FROM, req.body.email,
                Constants.SIGN_UP_MAIL_SUBJECT,
                `${Constants.SIGN_UP_TEXT}: ${link}`);
        }

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function verifyUser(req, res) {
    try {
        let decoded = jwt.verify(req.body.token,
            Constants.JWT_SECRET);
        if (decoded.data) {
            console.log(decoded.data);
            let user = await User.findById(decoded.data);

            if (user.status === 'Active') {
                sendResponse(res, 400, 'User already verified.');

            } else {
                let verifyUser = await User.findByIdAndUpdate(decoded.data, {
                    $set: {
                        status: 'Active'
                    }
                });
                sendResponse(res, 200, 'Verification Successful. Please login.');
            }

        } else {
            sendResponse(res, 400, 'No user found.');
        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }


}


async function sendOTPLogin(req, res) {
    try {
        let user = await User.findOne(req.body);
        if (user) {
            console.log(user);
            if (user.status === 'Active') {
                let otp = speakeasy.totp({
                    secret: user.speakeasy_secret.base32,
                    encoding: 'base32'
                });
                console.log(otp);

                let storeOTP =
                    await User.findByIdAndUpdate(user._id, {
                        $set: {
                            otp: otp
                        }
                    });
                sendResponse(res, 200, '6 digit Code has been sent to your registered email', otp);
                SendMail(Constants.MAIL_FROM, req.body.email,
                    Constants.SEND_OTP_SUBJECT,
                    `${Constants.SEND_OTP_TEXT}: ${otp}`);
            } else {
                sendResponse(res, 400, 'Please first verify your email');
            }
        } else {
            sendResponse(res, 400, 'Username or password maybe incorrect');

        }

    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);

    }
}

async function loginUser(req, res) {
    console.log(req.user);
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            console.log(user);
            if (user.status === 'Active') {
                let otpValidate = speakeasy.totp.verify({
                    secret: user.speakeasy_secret.base32,
                    encoding: 'base32',
                    token: req.body.otp,
                });
                console.log(otpValidate);
                if (otpValidate || user.otp !== req.body.otp) {
                    sendResponse(res, 400, 'Invalid OTP or OTP Expired');

                } else {
                    let token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user._id
                    }, Constants.JWT_SECRET);
                    let data = user;
                    data.token = token;
                    let updateLoginCountAndSaveToken =
                        await User.findByIdAndUpdate(user._id, {
                            // $inc: {
                            //     loginCount: 1
                            // },
                            $set: {
                                token: token,
                                otp: null
                            }
                        });
                    if (user.loginCount > 1) {
                        sendResponse(res, 200, 'Login Successful', data);

                    } else {
                        sendResponse(res, 206, 'Login Successful', data);

                    }

                }

            } else {
                sendResponse(res, 400, 'Please first verify your email');
            }
        } else {
            sendResponse(res, 400, 'Username or password maybe incorrect');

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}
module.exports = {
    addUser,
    verifyUser,
    sendOTPLogin,
    loginUser
};