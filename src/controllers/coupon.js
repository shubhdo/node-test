import Coupon from '../models/coupon';
import {
    sendResponse,
    SendMail
} from './functions';
import Constants from './constant';

async function createCoupon(req, res) {
    if (req.body.expiresOn)
        req.body.expiresOn = new Date(
            req.body.expiresOn.year,
            req.body.expiresOn.month,
            req.body.expiresOn.day
        );
    try {
        let coupon = await new Coupon(req.body).save();
        sendResponse(res, 200, 'Coupon created Successfully.', coupon);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function editCoupon(req, res) {
    if (req.body.expiresOn)
        req.body.expiresOn = new Date(
            req.body.expiresOn.year,
            req.body.expiresOn.month,
            req.body.expiresOn.day
        );

    console.log(req.body);
    try {
        let id = req.body.id;
        delete req.body.id;
        let updatedcoupon = await Coupon.findByIdAndUpdate(
            id, {
                $set: req.body
            }, {
                new: true
            }
        );
        sendResponse(res, 200, 'Coupon updated Successfully.', updatedcoupon);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function updateCouponStatus(req, res) {
    try {
        let id = req.body.id;
        delete req.body.id;
        let status;
        let coupon = await Coupon.findById(id);
        if (coupon) {
            if (coupon.status === 'Active')
                status = 'Inactive';
            else
                status = 'Active';


            let updatedcoupon = await Coupon.findByIdAndUpdate(
                id, {
                    $set: {
                        status: status
                    }
                }, {
                    new: true
                }
            );
            sendResponse(res, 200, 'Coupon deleted Successfully.', updatedcoupon);
        } else {
            sendResponse(res, 400, 'Coupon not found.');

        }
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

async function getCoupons(req, res) {
    try {
        let modules = await Coupon.find({
            // status: 'Active'
        });
        console.log(modules);

        sendResponse(res, 200, 'Successful.', modules);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, 'Unexpected error', e);
    }
}

module.exports = {
    createCoupon,
    editCoupon,
    updateCouponStatus,
    getCoupons
};